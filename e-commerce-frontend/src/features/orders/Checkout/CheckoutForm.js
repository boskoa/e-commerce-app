import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { TopButton } from "../../orderedProducts/Cart/ShoppingBag/TopComponent";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder } from "../ordersSlice";
import { selectLoggedUser } from "../../login/loginSlice";

const Form = styled.form`
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.7);
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StripeButton = styled(TopButton)`
  margin-top: 10px;
  border-radius: 3px;
`;

function CheckoutForm({ setShowStripe, orderId }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const token = useSelector(selectLoggedUser).token;
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    dispatch(updateOrder({ token, orderId, changedData: { status: true } }));

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  }

  return (
    <Form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <ButtonsContainer>
        <StripeButton onClick={() => setShowStripe(false)}>Cancel</StripeButton>
        <StripeButton
          type="checkout"
          disabled={isProcessing || !stripe || !elements}
          id="submit"
        >
          <span id="button-text">
            {isProcessing ? "Processing ... " : "Pay now"}
          </span>
        </StripeButton>
      </ButtonsContainer>
      {message && <div id="payment-message">{message}</div>}
    </Form>
  );
}

export default CheckoutForm;
