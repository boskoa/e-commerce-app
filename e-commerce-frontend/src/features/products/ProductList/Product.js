import { Link } from "react-router-dom";
import styled from "styled-components";
import ImageComponent from "../SingleProduct/ImageComponent";
import InfoComponent from "../SingleProduct/InfoComponent";
import { SeeAllButton } from "../Slider";

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: start;
  flex-wrap: wrap;
  gap: 15px;
  height: 250px;
  width: 100%;
  color: ${({ theme }) => theme.color};
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.7);
  transition: all 0.3s;

  &:hover {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.7);
    transform: scale(1.005);
  }
`;

const Button = styled(SeeAllButton)`
  top: auto;
  left: auto;
  bottom: 10px;
  right: 10px;
  font-size: 14px;
`;

function Product({ product }) {
  return (
    <Container>
      <ImageComponent product={product} height="250px" />
      <InfoComponent product={product} />
      <Link to={`/products/${product.id}`}>
        <Button>See product</Button>
      </Link>
    </Container>
  );
}

export default Product;
