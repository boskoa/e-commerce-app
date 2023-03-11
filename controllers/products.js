const { Op } = require("sequelize");
const { Product, Category, User, OrderedProduct } = require("../models");
const { Product_Category } = require("../models/ProductCategories");
const { tokenExtractor } = require("../utils/tokenExtractor");
const router = require("express").Router();

router.get("/", async (req, res, next) => {
  let where = {};
  let order = [];
  let pagination = {};

  if (req.query.search) {
    const [field, term] = req.query.search.split(",");
    where = { [field]: { [Op.substring]: term } };
  }

  if (req.query.order) {
    const [field, criterium] = req.query.order.split(",");
    order = [[field, criterium.toUpperCase()]];
  }

  if (req.query.pagination) {
    const [offset, limit] = req.query.pagination.split(",");
    pagination = { offset, limit };
  }

  try {
    const products = await Product.findAll({
      where,
      order,
      pagination,
      include: { model: Category, attributes: ["name"] },
    });
    return res.status(200).json(products);
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
      return res.status(404).end();
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
    product.set(req.body.data);
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

module.exports = { router };
