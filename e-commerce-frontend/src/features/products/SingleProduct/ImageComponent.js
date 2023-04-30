import { FavoriteBorder } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  createUsersLike,
  removeUsersLike,
  selectAllLikes,
} from "../../likedProducts/likedProductsSlice";
import { selectLoggedUser } from "../../login/loginSlice";

const ImageContainer = styled.div`
  flex: 1;
  min-width: 200px;
  align-self: stretch;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: ${({ height }) => height};
  object-fit: cover;
`;

const Icon = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.bg};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    opacity: 1;
  }

  &:active {
    transform: scale(1.1);
  }
`;

function ImageComponent({ product, height }) {
  const likedProducts = useSelector(selectAllLikes).map((l) => l.productId);
  const loggedUser = useSelector(selectLoggedUser);
  const dispatch = useDispatch();
  const liked = likedProducts.includes(product.id);

  function handleLike() {
    if (liked) {
      dispatch(
        removeUsersLike({ token: loggedUser.token, productId: product.id })
      );
    } else {
      dispatch(
        createUsersLike({ token: loggedUser.token, productId: product.id })
      );
    }
  }

  return (
    <ImageContainer>
      <Icon onClick={handleLike}>
        <FavoriteBorder style={{ color: liked && "red" }} />
      </Icon>
      <Image
        height={height}
        alt="product image"
        src={`/public/data/uploads/products/${product.id}.webp`}
      />
    </ImageContainer>
  );
}

export default ImageComponent;
