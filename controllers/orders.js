const { User, Order, OrderedProduct, Product } = require("../models");
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
    const [field, value] = req.query.search.split(",");
    where = { [field]: value };
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
    const orders = await Order.findAll({
      where,
      order,
      pagination,
      include: [
        { model: User, attributes: { exclude: ["passwordHash"] } },
        { model: OrderedProduct, include: Product },
      ],
    });
    return res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

router.get("/user-orders", tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!user) {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    const orders = await Order.findAll({
      where: { userId: req.decodedToken.id },
      include: [
        { model: User, attributes: { exclude: ["passwordHash"] } },
        { model: OrderedProduct, include: Product },
      ],
    });
    return res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!user) {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    const orders = await Order.findByPk(req.params.id, {
      include: [
        { model: User, attributes: { exclude: ["passwordHash"] } },
        { model: OrderedProduct, include: Product },
      ],
    });
    return res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

router.post("/", tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!user) {
    return res.status(401).json({ error: "Not authorized" });
  }

  if (!req.body.orderedProducts || !req.body.amount) {
    return res.status(401).json({ error: "Missing data" });
  }

  try {
    const order = await Order.create({
      userId: req.decodedToken.id,
      amount: req.body.amount,
    });
    for (const op of req.body.orderedProducts) {
      const orderedProduct = await OrderedProduct.findByPk(op);
      orderedProduct.set({ orderId: order.id });
      await orderedProduct.save();
    }
    const newOrder = await Order.findByPk(order.id, {
      include: [
        { model: User, attributes: { exclude: ["passwordHash"] } },
        { model: OrderedProduct, include: Product },
      ],
    });
    return res.status(200).json(newOrder);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!user?.admin) {
    return res.status(401).json({ error: "Not authorized" });
  }

  if (!req.body) {
    return res.status(200).send("Nothing to change");
  }

  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        { model: User, attributes: { exclude: ["passwordHash"] } },
        { model: OrderedProduct, include: Product },
      ],
    });
    order.set({ ...req.body });
    await order.save();
    return res.status(200).json(order);
  } catch (error) {
    next(error);
  }
});

module.exports = { router };
