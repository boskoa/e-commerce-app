const { sequelize } = require("../utils/db");
const { Op } = require("sequelize");
const { User, OrderedProduct, Product } = require("../models");
const { tokenExtractor } = require("../utils/tokenExtractor");
const router = require("express").Router();

router.get("/popular", async (req, res, next) => {
  try {
    const popularProducts = await OrderedProduct.findAll({
      attributes: [
        ["product_id", "id"],
        [sequelize.fn("SUM", sequelize.col("quantity")), "count_products"],
      ],
      where: { orderId: { [Op.not]: null } },
      group: "product_id",
      order: [["count_products", "DESC"]],
      limit: 6,
    });
    return res.status(200).json(popularProducts);
  } catch (error) {
    next(error);
  }
});

router.get("/bestsellers", async (req, res, next) => {
  let start;
  let end;

  if (req.query.start === "0") {
    start = new Date(null);
  } else {
    start = new Date(req.query.start);
  }

  if (req.query.end === "0") {
    end = new Date();
  } else {
    end = new Date(req.query.end);
  }

  try {
    const bestsellers = await OrderedProduct.findAll({
      attributes: [
        ["product_id", "id"],
        [sequelize.fn("SUM", sequelize.col("quantity")), "count_products"],
      ],
      where: {
        orderId: { [Op.not]: null },
        updatedAt: {
          [Op.between]: [start, end],
        },
      },
      group: ["product_id", "product.id"],
      order: [["count_products", "DESC"]],
      limit: 20,
      include: Product,
    });
    return res.status(200).json(bestsellers);
  } catch (error) {
    next(error);
  }
});

router.get("/best-earners", async (req, res, next) => {
  let start;
  let end;

  if (req.query.start === "0") {
    start = "2000-01-01";
  } else {
    start = req.query.start;
  }

  if (req.query.end === "0") {
    end = "2150-01-01";
  } else {
    end = req.query.end;
  }

  try {
    const bestEarners = await sequelize.query(
      `SELECT
        product_id AS "id",
        SUM(quantity * ordered_products.price) AS "total_amount",
        title
        FROM ordered_products
        JOIN products ON product_id=products.id
        WHERE order_id IS NOT NULL
          AND ordered_products.updated_at BETWEEN '${start}' AND '${end}'
        GROUP BY product_id, products.title
        ORDER BY total_amount DESC
        LIMIT 20`,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return res.status(200).json(bestEarners);
  } catch (error) {
    next(error);
  }
});

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
  if (!user?.admin && user.id !== req.decodedToken.id) {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    const selectedProduct = await OrderedProduct.findAll({
      where: { userId: req.params.id, orderId: { [Op.eq]: null } },
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
    const orderedProduct = await OrderedProduct.findByPk(addedProduct.id, {
      include: Product,
    });
    return res.status(200).json(orderedProduct);
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
    await OrderedProduct.destroy({
      where: { id: Number(req.params.id) },
    });
    return res.status(200).json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
});

router.get("/sales/:id", tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!user?.admin && user.id !== req.decodedToken.id) {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    const selectedProductOrders = await OrderedProduct.findAll({
      where: { productId: req.params.id, orderId: { [Op.ne]: null } },
    });
    if (!selectedProductOrders.length) {
      return res.status(404).end();
    }

    return res.status(200).json(selectedProductOrders);
  } catch (error) {
    next(error);
  }
});

module.exports = { router };
