import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersOrders, selectAllOrders } from "../ordersSlice";
import { selectLoggedUser } from "../../login/loginSlice";
import Order from "./Order";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

function UsersOrders() {
  const orders = useSelector(selectAllOrders);
  const token = useSelector(selectLoggedUser).token;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersOrders(token));
  }, [dispatch, token]);

  return (
    <Container>
      {orders.map((o) => (
        <Order key={o.id} order={o} />
      ))}
    </Container>
  );
}

export default UsersOrders;
