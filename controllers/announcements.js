const { Op } = require("sequelize");
const { User } = require("../models");
const { Announcement } = require("../models/announcement");
const { tokenExtractor } = require("../utils/tokenExtractor");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  let where;
  let order = [["updated_at", "DESC"]];

  if (req.query.search) {
    where = {
      content: { [Op.iLike]: `%${req.query.search.split(",").join(" ")}%` },
    };
  }

  if (req.query.order) {
    const [field, criterium] = req.query.order.split(",");
    order = [
      [field, criterium.toUpperCase()],
      ["id", "ASC"],
    ];
  }

  try {
    const announcements = await Announcement.findAll({
      order,
      where,
    });
    return res.status(200).json(announcements);
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
    const announcement = await Announcement.create({ ...req.body });
    return res.status(200).json(announcement);
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
    const announcement = await Announcement.findByPk(req.params.id);
    announcement.set(req.body);
    await announcement.save();
    return res.status(200).json(announcement);
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
    await Announcement.destroy({ where: { id: req.params.id } });
    return res.status(200).json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
});

module.exports = { router };
