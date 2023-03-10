const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).send("HAI");
});

module.exports = { router };
