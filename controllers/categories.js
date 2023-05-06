const { Category, Product, User } = require("../models");
const { Product_Category } = require("../models/ProductCategories");
const { tokenExtractor } = require("../utils/tokenExtractor");
const router = require("express").Router();
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const { sequelize } = require("../utils/db");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/data/defaults/categories");
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
  try {
    /*const categories = await Category.findAll({
      include: {
        model: Product,
        attributes: ["title"],
      },
    });*/
    const categories = await sequelize.query(
      `
      SELECT
        categories.id,
        categories.name,
        categories.created_at,
        categories.updated_at,
        COUNT("Product_Categories"."productId") AS products_count
      FROM categories
      LEFT JOIN "Product_Categories" ON "Product_Categories"."categoryId"=categories.id
      GROUP BY
        categories.id
    `,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
});

router.get("/category-products", async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      attributes: ["id", "name"],
      include: { model: Product, attributes: ["title"] },
    });
    return res.status(200).json(categories);
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
    const category = await Category.create({
      ...req.body,
    });
    return res.status(200).json(category);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!user?.admin) {
    return res.status(401).json({ error: "Not authorized" });
  }
  const category = await Category.findByPk(req.params.id);

  try {
    category.set({ name: req.body.name });
    await category.save();
    return res.status(200).json(category);
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
    await Product_Category.destroy({ where: { categoryId: req.params.id } });
    await Category.destroy({ where: { id: req.params.id } });
    return res.status(200).json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/category-image/:id",
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
