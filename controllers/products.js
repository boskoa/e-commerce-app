const { Product, Category, User } = require("../models");
const { tokenExtractor } = require("../utils/tokenExtractor");
const router = require("express").Router();

router.post("/", tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!user?.admin) {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    const product = await Product.create({
      ...req.body,
    });
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    const category = await Category.findOne({ where: { name: req.body.name } });
    await product.addCategory(category);
    const result = await Product.findOne({
      where: { id: req.params.id },
      include: Category,
    });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = { router };
