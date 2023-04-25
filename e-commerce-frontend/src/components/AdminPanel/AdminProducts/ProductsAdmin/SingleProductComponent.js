import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoggedUser } from "../../../../features/login/loginSlice";

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 5px;
  height: 190px;
  width: 100%;
  overflow: hidden;
  color: ${({ theme }) => theme.color};
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.7);
  transition: all 0.3s;

  @media only screen and (max-width: 1000px) {
    flex-direction: column;
    justify-content: start;
    flex-wrap: no-wrap;
    height: 360px;
  }

  @media only screen and (min-width: 800px) {
    width: 48%;
  }
`;

const ImageContainer = styled.div`
  width: 200px;
  align-self: stretch;
  position: relative;

  @media only screen and (max-width: 1000px) {
    width: 100%;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 190px;
  object-fit: cover;
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 5px;
  padding: 10px;
`;

const Title = styled.p`
  font-size: 20px;
  max-height: 46px;
  overflow: hidden;
`;

const Description = styled.p`
  font-size: 14px;
  max-height: 70px;
  overflow: hidden;
`;

const Price = styled.p`
  font-size: 14px;
  font-weight: 800;
`;

const ButtonsContainer = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const Button = styled.button`
  background-color: red;
  color: white;
  padding: 2px;
  font-size: 12px;
  border: none;
  border-radius: 1px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: black;
  }

  &:active {
    transform: scale(0.97);
  }
`;

function SingleProductComponent({ product }) {
  const admin = useSelector(selectLoggedUser);

  return (
    <Container>
      <ImageContainer>
        <Image
          alt="product image"
          src={`/data/uploads/products/${product.id}.webp`}
        />
      </ImageContainer>
      <Info>
        <Title>{product.title}</Title>
        <Description>{product.description}</Description>
        <p>ID: {product.id}</p>
        <Price>${product.price}</Price>
        <ButtonsContainer>
          <Link to={`/${admin.id}/admin-panel/products/stats/${product.id}`}>
            <Button>Stats</Button>
          </Link>
          <Link to={`/${admin.id}/admin-panel/products/single/${product.id}`}>
            <Button>Update</Button>
          </Link>
        </ButtonsContainer>
      </Info>
    </Container>
  );
}

export default SingleProductComponent;
