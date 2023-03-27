import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Spinner from "../../../components/Spinner";
import { selectLoggedUser } from "../../login/loginSlice";
import { getSelectedOrder, selectOrdersById } from "../ordersSlice";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.color};
`;

const Data = styled.div`
  display: flex;
  flex-direction: column;
`;

function Checkout() {
  const { id } = useParams();
  const order = useSelector((state) => selectOrdersById(state, id));
  const loggedUser = useSelector(selectLoggedUser);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("ORDERS", order);
  }, [order]);

  useEffect(() => {
    dispatch(getSelectedOrder({ id, token: loggedUser.token }));
  }, []);

  if (!order) {
    return <Spinner />;
  }

  return (
    <Container>
      <Data>
        <p>Order ID: {order.id}</p>
        <p>Username: {order.user.username}</p>
        <p>
          Created at:{" "}
          {new Date(order.createdAt).toLocaleString("en-US", { hour12: false })}
        </p>
        <ul>
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
    </Container>
  );
}

export default Checkout;
