require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  SECRET: process.env.SECRET,
  STRIPE_KEY: process.env.STRIPE_KEY,
  STRIPE_TEST: process.env.STRIPE_TEST,
};
