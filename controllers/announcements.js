const { User } = require("../models");
const { Announcement } = require("../models/announcement");
const { tokenExtractor } = require("../utils/tokenExtractor");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const announcements = await Announcement.findAll({
      order: [["updated_at", "DESC"]],
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
    const announcement = await Announcement.create({ ...req.body.data });
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
    announcement.set(req.body.data);
    await announcement.save();
    return res.status(200).json(announcement);
  } catch (error) {
    next(error);
  }
});

module.exports = { router };
