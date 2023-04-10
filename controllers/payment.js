const router = require("express").Router();
const { STRIPE_TEST } = require("../utils/config");
const { STRIPE_KEY } = require("../utils/config");
const stripe = require("stripe")(STRIPE_KEY);

router.get("/config", (_req, res) => {
  return res.status(200).send({ publishableKey: STRIPE_TEST });
});

router.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "USD",
      amount: req.body.amount * 100,
      automatic_payment_methods: { enabled: true },
    });

    return res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

module.exports = { router };
