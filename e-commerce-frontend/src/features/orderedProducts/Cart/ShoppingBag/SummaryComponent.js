import styled from "styled-components";

const SummaryItem = styled.p`
  font-size: 14px;
`;

const Summary = styled.div`
  position: sticky;
  top: 70px;
  border: 1px solid ${({ theme }) => theme.color};
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  min-width: 200px;
  gap: 6px;
`;

function SummaryComponent({ checkedProducts }) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const subtotal = checkedProducts.reduce(
    (p, c) => c.price * c.quantity + p,
    0
  );
  const shipping = checkedProducts.reduce(
    (p, c) => 10 + (10 / c.price) * c.quantity + p,
    0
  );

  return (
    <Summary>
      <SummaryItem>Subtotal: {formatter.format(subtotal)}</SummaryItem>
      <SummaryItem>
        Estimated shipping: {formatter.format(shipping)}
      </SummaryItem>
      <SummaryItem>
        Shipping discount: -{formatter.format(shipping)}
      </SummaryItem>
      <SummaryItem>Total: {formatter.format(subtotal)}</SummaryItem>
    </Summary>
  );
}

export default SummaryComponent;
