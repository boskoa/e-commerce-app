/* eslint-disable indent */
const { Op } = require("sequelize");
const { Product, Category, User, OrderedProduct } = require("../models");
const { Product_Category } = require("../models/ProductCategories");
const { tokenExtractor } = require("../utils/tokenExtractor");
const router = require("express").Router();
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/data/uploads/products");
  },
  filename: (req, file, cb) => {
    cb(null, req.params.id);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 512000 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/webp"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(
        new Error("Only .png, .jpg, .jpeg and .webp formats are allowed.")
      );
    }

    return 0;
  },
});

router.get("/", async (req, res, next) => {
  let where = {};
  let order = [];
  let pagination = {};
  let categoryWhere = {};

  if (req.query.title) {
    where = {
      ...where,
      title: { [Op.iLike]: `%${req.query.title.split(",").join(" ")}%` },
    };
  }

  if (req.query.color) {
    where = { ...where, colors: { [Op.contains]: [req.query.color] } };
  }

  if (req.query.size) {
    where = { ...where, sizes: { [Op.contains]: [req.query.size] } };
  }

  if (req.query.category) {
    categoryWhere.name = req.query.category;
  }

  if (req.query.order) {
    const [field, criterium] = req.query.order.split(",");
    order = [
      [field, criterium.toUpperCase()],
      ["id", "ASC"],
    ];
  }

  if (req.query.pagination) {
    const [offset, limit] = req.query.pagination.split(",");
    pagination = { offset, limit };
  }

  try {
    const products = await Product.findAll({
      where,
      order,
      ...pagination,
      include: {
        model: Category,
        attributes: ["name"],
        [Object.keys(categoryWhere).length > 0 && "where"]: categoryWhere,
      },
    });
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

router.get("/latest", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      order: [["created_at", "DESC"]],
      offset: 0,
      limit: 6,
    });
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

router.get("/colors-sizes", async (req, res, next) => {
  try {
    const products = await Product.findAll({ attributes: ["colors", "sizes"] });
    const colors = products.reduce((p, c) => p.concat(c.colors), []);
    const uniqueColors = [...new Set(colors)];
    const sizes = products.reduce((p, c) => p.concat(c.sizes), []);
    const uniqueSizes = [...new Set(sizes)];
    return res.status(200).json({ uniqueColors, uniqueSizes });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: { model: Category, attributes: ["name"] },
    });
    if (!product) {
      return res.status(404).json({ error: "Non-existing ID" });
    }
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

router.post("/", tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!user?.admin) {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    const product = await Product.create({
      ...req.body.data,
    });
    if (req.body.categories?.length > 0) {
      for (const cat of req.body.categories) {
        let category = await Category.findOne({
          where: { name: cat },
        });
        if (!category) {
          category = await Category.create({ name: cat });
        }
        await product.addCategory(category);
      }
    }

    const result = await Product.findOne({
      where: { id: product.id },
      include: Category,
    });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!user?.admin) {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    const product = await Product.findByPk(req.params.id);
    if (req.body.categories?.length > 0) {
      for (const cat of req.body.categories) {
        let category = await Category.findOne({
          where: { name: cat },
        });
        if (!category) {
          category = await Category.create({ name: cat });
        }
        await product.addCategory(category);
      }
    }
    const newData = { ...req.body };
    if (newData.categories) delete newData.categories;
    product.set(newData);
    await product.save();

    const result = await Product.findOne({
      where: { id: req.params.id },
      include: Category,
    });

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!user?.admin) {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    await OrderedProduct.destroy({ where: { productId: req.params.id } });
    await Product_Category.destroy({ where: { productId: req.params.id } });
    await Product.destroy({ where: { id: req.params.id } });
    return res.status(200).end();
  } catch (error) {
    next(error);
  }
});

router.post(
  "/product-image/:id",
  tokenExtractor,
  upload.single("file"),
  async (req, res) => {
    const user = await User.findByPk(req.decodedToken.id);
    if (!user?.admin) {
      return res.status(401).json({ error: "Not authorized" });
    }

    if (
      req.file.mimetype !== "image/jpeg" &&
      req.file.mimetype !== "image/png" &&
      req.file.mimetype !== "image/jpg" &&
      req.file.mimetype !== "image/webp"
    ) {
      return res.status(401).json({
        error: "Not a proper image type. Use jpg, jpeg, webp or png.",
      });
    }
    res.status(200).end();

    const { filename: image } = req.file;
    await sharp(req.file.path)
      .resize({ width: 600 })
      .webp({ quality: 80 })
      .toFile(path.resolve(req.file.destination, `${image}.webp`))
      .then((info) => console.log("Info: ", info))
      .catch((err) => console.log("Error: ", err));
    fs.unlinkSync(req.file.path);
    return 0;
  }
);

module.exports = { router };
