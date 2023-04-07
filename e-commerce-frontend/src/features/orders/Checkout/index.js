import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Spinner from "../../../components/Spinner";
import { selectLoggedUser } from "../../login/loginSlice";
import { getSelectedOrder, selectOrdersById } from "../ordersSlice";
import StripeCheckoutComponent from "./StripeCheckoutComponent";
import { TopButton } from "../../orderedProducts/Cart/ShoppingBag/TopComponent";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 80vh;
  padding: 10px;
  align-items: center;
  gap: 20px;
  color: ${({ theme }) => theme.color};
`;

const Data = styled.div`
  display: flex;
  flex-direction: column;
`;

function Checkout() {
  const [showStripe, setShowStripe] = useState(false);
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const { id } = useParams();
  const order = useSelector((state) => selectOrdersById(state, id));
  const loggedUser = useSelector(selectLoggedUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSelectedOrder({ id, token: loggedUser.token }));
  }, [dispatch, id, loggedUser]);

  useEffect(() => {
    if (!topRef.current) return;
    if (showStripe) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showStripe]);

  if (!order) {
    return <Spinner />;
  }

  return (
    <Container ref={topRef}>
      <Data>
        <p>Order ID: {order.id}</p>
        <p>Username: {order.user.username}</p>
        <p>
          Created at:{" "}
          {new Date(order.createdAt).toLocaleString("en-US", { hour12: false })}
        </p>
        <ul style={{ listStyle: "none" }}>
          Ordered products:
          {order.orderedProducts.map((p) => (
            <li key={p.id}>
              {p.product.title}, qty: {p.quantity}
            </li>
          ))}
        </ul>
        <p>Amount: {order.amount}</p>
        <p>Status: {order.status ? "completed" : "pending"}</p>
      </Data>
      <TopButton
        disabled={showStripe}
        onClick={() => {
          setShowStripe(true);
        }}
      >
        Proceed to pay
      </TopButton>
      {showStripe && (
        <StripeCheckoutComponent
          bottomRef={bottomRef}
          setShowStripe={setShowStripe}
          loggedUser={loggedUser}
        />
      )}
    </Container>
  );
}

export default Checkout;
