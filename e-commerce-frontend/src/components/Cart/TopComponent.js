import styled from "styled-components";

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TopButton = styled.button`
  padding: 5px;
  background-color: ${({ theme, type }) =>
    type === "checkout" ? theme.primary : theme.secondary};
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: black;
  }

  &:active {
    background-color: ${({ theme, type }) =>
      type === "checkout" ? theme.primary : theme.secondary};
  }
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

const Text = styled.span`
  cursor: pointer;
`;

function TopComponent() {
  return (
    <Top>
      <TopButton>Continue shopping</TopButton>
      <TextContainer>
        <Text>Shopping bag (1)</Text>
        <Text>Your wishlist (0)</Text>
      </TextContainer>
      <TopButton type="checkout">Checkout now</TopButton>
    </Top>
  );
}

export default TopComponent;
