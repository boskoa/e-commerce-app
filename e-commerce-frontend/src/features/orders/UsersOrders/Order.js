import styled from "styled-components";

const OrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.color};
  border-radius: 5px;
  margin: 5px;
  padding: 5px;
`;

const ContainerItem = styled.p`
  font-size: 14px;
`;

const Status = styled.span`
  color: ${({ theme, status }) => (status ? theme.slider[3] : theme.slider[0])};
  font-weight: 800;
  background-color: ${({ theme, status }) =>
    status ? theme.color : theme.color};
  padding: 0 5px 2px 5px;
  border-radius: 10px;
`;

function Order({ order }) {
  return (
    <OrderContainer>
      <ContainerItem>Order ID: {order.id}</ContainerItem>
      <ContainerItem>Amount: {order.amount}</ContainerItem>
      <ContainerItem>
        Created at:{" "}
        {new Date(order.createdAt).toLocaleString("en-US", { hour12: false })}
      </ContainerItem>
      <ContainerItem>
        Products:{" "}
        <ul style={{ listStyle: "none" }}>
          {order.orderedProducts.map((op, i) => (
            <li key={i} style={{ marginLeft: "10px" }}>
              {op.product.title}, {op.quantity} pcs.
            </li>
          ))}
        </ul>
      </ContainerItem>
      <ContainerItem>
        Status:{" "}
        {order.status ? (
          <Status status={order.status}>processed</Status>
        ) : (
          <Status>pending</Status>
        )}
      </ContainerItem>
    </OrderContainer>
  );
}

export default Order;
