import styled from "styled-components";
import { TopButton } from "../../orderedProducts/Cart/ShoppingBag/TopComponent";
import { useNavigate } from "react-router-dom";

const OrderContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid
    ${({ status }) => (status ? "#59eb68" : "#e05565")};
  border-radius: 5px;
  margin: 5px;
  padding: 5px;
  transition transform 0.3s;

  &:hover {
    box-shadow: 0px 0px 5px 0
        ${({ status }) => (status ? "#59eb68" : "#e05565")},
      inset 0px 0px 5px 0
        ${({ status }) => (status ? "#59eb68" : "#e05565")};
    transform: scale(1.01)
  }
`;

const ContainerItem = styled.p`
  font-size: 14px;
`;

const List = styled.ul`
  font-size: 14px;
  liststyle: "none";
`;

const Status = styled.span`
  color: white;
  font-weight: 600;
  background-color: ${({ status }) => (status ? "#59eb68" : "#e05565")};
  padding: 0 5px 2px 5px;
  border-radius: 10px;
`;

const PayNowButton = styled(TopButton)`
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 5px;
`;

function Order({ order }) {
  const navigate = useNavigate();

  return (
    <OrderContainer status={order.status}>
      <ContainerItem>Order ID: {order.id}</ContainerItem>
      <ContainerItem>Amount: {order.amount}</ContainerItem>
      <ContainerItem>
        Created at:{" "}
        {new Date(order.createdAt).toLocaleString("en-US", { hour12: false })}
      </ContainerItem>
      <List>
        Products:{" "}
        {order.orderedProducts.map((op, i) => (
          <li key={i} style={{ marginLeft: "15px" }}>
            {op.product.title}, ${op.price}, {op.quantity} pcs.
          </li>
        ))}
      </List>
      <ContainerItem>
        Status:{" "}
        {order.status ? (
          <Status status={order.status}>processed</Status>
        ) : (
          <Status>pending</Status>
        )}
      </ContainerItem>
      {!order.status && (
        <PayNowButton
          onClick={() => navigate(`/orders/${order.id}`)}
          type="checkout"
        >
          Pay now
        </PayNowButton>
      )}
    </OrderContainer>
  );
}

export default Order;
