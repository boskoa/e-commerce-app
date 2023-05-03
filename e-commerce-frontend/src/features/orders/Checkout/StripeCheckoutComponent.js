import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  max-width: 500px;
`;

function StripeCheckoutComponent({ bottomRef, setShowStripe, order }) {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("/api/payment/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    async function createPaymentIntent() {
      const response = await axios.post("/api/payment/create-payment-intent", {
        amount: Math.round(order.amount * 100),
      });
      const { clientSecret } = response.data;
      setClientSecret(clientSecret);
    }
    if (order.amount) {
      createPaymentIntent();
    }
  }, [order.amount]);

  return (
    <Container ref={bottomRef}>
      {clientSecret.length > 0 && stripePromise && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret }}
          key={clientSecret}
        >
          <CheckoutForm setShowStripe={setShowStripe} orderId={order.id} />
        </Elements>
      )}
    </Container>
  );
}

export default StripeCheckoutComponent;
