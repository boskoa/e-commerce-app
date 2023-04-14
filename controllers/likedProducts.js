const { Op } = require("sequelize");
const { User, Product } = require("../models");
const { User_Product } = require("../models/UserProducts");
const { tokenExtractor } = require("../utils/tokenExtractor");
const router = require("express").Router();

router.get("/", tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!user) {
    return res.status(401).json({ error: "Not authorized" });
  }

  const likedProducts = await User_Product.findAll({
    where: { userId: req.decodedToken.id },
    include: Product,
  });

  try {
    return res.status(200).json(likedProducts);
  } catch (error) {
    res.status(400).json({ error });
    next(error);
  }
});

router.post("/", tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!user) {
    return res.status(401).json({ error: "Not authorized" });
  }
  if (!req.body.productId) {
    return res.status(400).json({ error: "Missing product" });
  }

  const likedProduct = await User_Product.create({
    userId: req.decodedToken.id,
    productId: req.body.productId,
  });
  const product = await User_Product.findByPk(likedProduct.id, {
    include: Product,
  });
  try {
    return res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error });
    next(error);
  }
});

router.delete("/:id", tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!user) {
    return res.status(401).json({ error: "Not authorized" });
  }

  const removedLike = await User_Product.findOne({
    where: {
      [Op.and]: [
        { productId: Number(req.params.id) },
        { userId: req.decodedToken.id },
      ],
    },
  });

  try {
    const id = removedLike.id;
    await removedLike.destroy();
    return res.status(200).json(id);
  } catch (error) {
    next(error);
  }
});

module.exports = { router };
