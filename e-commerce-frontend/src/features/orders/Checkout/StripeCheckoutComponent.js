import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import styled from "styled-components";

const Container = styled.div`
  max-width: 500px;
`;

function StripeCheckoutComponent({ bottomRef, setShowStripe }) {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("/api/payment/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch("/api/payment/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({}),
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <Container ref={bottomRef}>
      {clientSecret.length > 0 && stripePromise && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret }}
          key={clientSecret}
        >
          <CheckoutForm setShowStripe={setShowStripe} />
        </Elements>
      )}
    </Container>
  );
}

export default StripeCheckoutComponent;
