import styled from "styled-components";

const SummaryItem = styled.p`
  font-size: 14px;
`;

const Summary = styled.div`
  border: 1px solid ${({ theme }) => theme.color};
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

function SummaryComponent() {
  return (
    <Summary>
      <SummaryItem>Subtotal: $ 400.00</SummaryItem>
      <SummaryItem>Estimated shipping: $ 10.00</SummaryItem>
      <SummaryItem>Shipping discount: $ -10.00</SummaryItem>
      <SummaryItem>Total: $ 400.00</SummaryItem>
    </Summary>
  );
}

export default SummaryComponent;
