const router = require("express").Router();
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const { User, Order, OrderedProduct, Product } = require("../models");
const { tokenExtractor } = require("../utils/tokenExtractor");

router.get("/", tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!user?.admin) {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    const users = await User.findAll({
      attributes: { exclude: ["passwordHash"] },
    });
    return res.status(200).json(users);
  } catch (error) {
    res.status(400).json({
      error: "Can't respond",
    });
    next(error);
  }
});

router.get("/:id", tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!user?.admin) {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["passwordHash"] },
      include: Order,
    });
    if (!user) {
      res.status(404).json({
        error: "No such user",
      });
    }
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.post("/check-username", async (req, res) => {
  const user = await User.findAll({ where: { username: req.body.username } });
  try {
    return res.status(200).json(user.length);
  } catch {
    return res.status(400).json({ error: "Could not check username" });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const userData = { ...req.body };
    delete userData.password;
    userData.passwordHash = passwordHash;
    const numOfUsers = await User.count();
    // Designate first user as admin
    if (numOfUsers === 0) {
      userData.admin = true;
    }

    await User.create({ ...userData });
    const newUser = await User.findOne({
      where: { username: userData.username },
      attributes: { exclude: ["passwordHash"] },
    });
    return res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({
      error:
        "Registration failed. Check your data formating/try another username",
    });
    next(error);
  }
});

router.patch("/:id", tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!user?.admin && (req.body.admin || req.body.disabled)) {
    return res.status(401).json({ error: "Not authorized" });
  }

  if (!user?.admin && Number(req.params.id) !== req.decodedToken.id) {
    return res.status(401).json({ error: "Not authorized" });
  }

  if (!req.body) {
    return res.status(200).send("Nothing to change");
  }

  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["passwordHash"] },
    });
    let newData = { ...req.body };
    if (newData.password) {
      const passwordHash = await bcrypt.hash(newData.password, 10);
      newData.passwordHash = passwordHash;
      delete newData.password;
    }
    user.set(newData);
    await user.save();
    const changedUser = await User.findByPk(req.params.id, {
      attributes: { exclude: ["passwordHash"] },
    });
    return res.status(200).json(changedUser);
  } catch (error) {
    res.status(400).json({
      error: "Can't change user",
    });
    next(error);
  }
});

router.get("/:id/cart", tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!user?.admin && req.params.id !== req.decodedToken.id) {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    const cart = await OrderedProduct.findAll({
      where: {
        [Op.and]: [{ userId: req.params.id }, { orderId: { [Op.is]: null } }],
      },
      include: Product,
    });
    return res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
});

module.exports = { router };
