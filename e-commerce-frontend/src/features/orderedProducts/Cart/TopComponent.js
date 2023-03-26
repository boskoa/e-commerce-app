import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { selectLoggedUser } from "../../login/loginSlice";
import { selectOrderedProductIds } from "../orderedProductsSlice";

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
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
  color: ${({ theme }) => theme.color};
`;

function TopComponent() {
  const id = useSelector(selectLoggedUser).id;
  const cartItems = useSelector(selectOrderedProductIds).length;

  return (
    <Top>
      <TopButton>Continue shopping</TopButton>
      <TextContainer>
        <Link style={{ textDecoration: "none" }} to={`/cart/${id}`}>
          <Text>Shopping bag ({cartItems})</Text>
        </Link>
        <Link style={{ textDecoration: "none" }} to={`/cart/${id}/wishlist`}>
          <Text>Your wishlist (0)</Text>
        </Link>
      </TextContainer>
      <TopButton type="checkout">Checkout now</TopButton>
    </Top>
  );
}

export default TopComponent;
