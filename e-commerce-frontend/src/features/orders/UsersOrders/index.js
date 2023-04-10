import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersOrders, selectAllOrders } from "../ordersSlice";
import { selectLoggedUser } from "../../login/loginSlice";
import Order from "./Order";
import styled from "styled-components";
import Filter from "./Filter";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const Title = styled.h3`
  align-self: center;
`;

function UsersOrders() {
  const [filter, setFilter] = useState(null);
  const unfilteredOrders = useSelector(selectAllOrders);
  const user = useSelector(selectLoggedUser);
  const dispatch = useDispatch();
  const orders = !filter
    ? unfilteredOrders
    : unfilteredOrders.filter((o) =>
        filter === "processed" ? o.status : !o.status
      );

  useEffect(() => {
    dispatch(getUsersOrders(user.token));
  }, [dispatch, user.token]);

  return (
    <Container>
      <Title>{user.name}'s orders</Title>
      <Filter filter={filter} setFilter={setFilter} />
      {orders.map((o) => (
        <Order key={o.id} order={o} />
      ))}
    </Container>
  );
}

export default UsersOrders;
