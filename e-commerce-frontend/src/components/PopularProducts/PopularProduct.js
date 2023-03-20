import {
  FavoriteBorder,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  opacity: 0.8;
  transition: all 0.3s;
`;

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex: 1;
  margin: 5px;
  height: 50vh;
  min-width: 200px;
  max-width: 300px;
  background-color: rgba(0, 0, 0, 0.1);

  &:hover ${Image} {
    opacity: 1;
  }

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Icon = styled.div`
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

function PopularProduct({ product }) {
  return (
    <Container>
      <Image src={product.img} alt={"product image " + product.id} />
      <Info>
        <Icon>
          <ShoppingCartOutlined />
        </Icon>
        <Link to={`/products/${product.id}`}>
          <Icon>
            <SearchOutlined />
          </Icon>
        </Link>
        <Icon>
          <FavoriteBorder />
        </Icon>
      </Info>
    </Container>
  );
}

export default PopularProduct;
