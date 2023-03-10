const express = require("express");
const cors = require("cors");
const path = require("path");
const { errorHandler } = require("./utils/errorHandler");
const { router: testRouter } = require("./controllers/itsAlive");
const { router: productsRouter } = require("./controllers/products");
const { router: categoriesRouter } = require("./controllers/categories");
const { router: usersRouter } = require("./controllers/users");
const { router: loginRouter } = require("./controllers/login");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.static("build"));

app.use("/api/test", testRouter);
app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.all("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use(errorHandler);

module.exports = { app };
