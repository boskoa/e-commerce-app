const { User, OrderedProduct, Product } = require("../models");
const { tokenExtractor } = require("../utils/tokenExtractor");

const router = require("express").Router();

router.get("/", tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!user?.admin) {
    return res.status(401).json({ error: "Not authorized" });
  }

  let where = {};
  let order = [];
  let pagination = {};

  if (req.query.search) {
    const [field, id] = req.query.search.split(",");
    where = { [field]: id };
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
    const orderedProducts = await OrderedProduct.findAll({
      where,
      order,
      pagination,
      include: Product,
    });
    return res.status(200).json(orderedProducts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!user?.admin) {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    const selectedProduct = await OrderedProduct.findByPk(req.params.id, {
      include: Product,
    });
    if (!selectedProduct) {
      return res.status(404).end();
    }
    return res.status(200).json(selectedProduct);
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
    const addedProduct = await OrderedProduct.create({ ...req.body });
    return res.status(200).json(addedProduct);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!user?.admin && req.params.id !== req.decodedToken.id) {
    return res.status(401).json({ error: "Not authorized" });
  }

  if (!req.body) {
    return res.status(200).send("Nothing to change");
  }

  try {
    const addedProduct = await OrderedProduct.findByPk(req.params.id, {
      include: [
        { model: User, attributes: { exclude: ["passwordHash"] } },
        { model: Product },
      ],
    });
    if (addedProduct.orderId !== null) {
      return res
        .status(401)
        .json({ error: "Can't change - product is already purchased" });
    }
    addedProduct.set({ ...req.body });
    await addedProduct.save();
    return res.status(200).json(addedProduct);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!user?.admin && req.params.id !== req.decodedToken.id) {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    await OrderedProduct.destroy({ where: { productId: req.params.id } });
    return res.status(200).end();
  } catch (error) {
    next(error);
  }
});

module.exports = { router };
