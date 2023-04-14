import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { selectLoggedUser } from "../../login/loginSlice";
import { selectOrderedProductIds } from "../orderedProductsSlice";
import { selectLikeIds } from "../../likedProducts/likedProductsSlice";

const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const Text = styled.span`
  cursor: pointer;
  color: ${({ theme }) => theme.color};
`;

function BagWishlist() {
  const id = useSelector(selectLoggedUser).id;
  const cartItems = useSelector(selectOrderedProductIds).length;
  const wishlistItems = useSelector(selectLikeIds).length;

  return (
    <TextContainer>
      <Link style={{ textDecoration: "none" }} to={`/cart/${id}`}>
        <Text>Shopping bag ({cartItems})</Text>
      </Link>
      <Link style={{ textDecoration: "none" }} to={`/cart/${id}/wishlist`}>
        <Text>Your wishlist ({wishlistItems})</Text>
      </Link>
    </TextContainer>
  );
}

export default BagWishlist;
