const { Category, Product, User } = require("../models");
const { tokenExtractor } = require("../utils/tokenExtractor");
const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const categories = await Category.findAll();
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

module.exports = { router };
