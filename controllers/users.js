const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../models");
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
    });
    return res.status(200).json(user);
  } catch (error) {
    next(error);
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
    res.status(401).json({ error: "Invalid user data" });
    next(error);
  }
});

router.patch("/:id", tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!user?.admin && (req.body.admin || req.body.disabled)) {
    return res.status(401).json({ error: "Not authorized" });
  }

  if (!user?.admin && req.params.id !== req.decodedToken.id) {
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
    next(error);
  }
});

module.exports = { router };
