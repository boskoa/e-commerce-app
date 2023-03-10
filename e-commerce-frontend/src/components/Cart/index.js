import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  padding: 20px;
`;

const Title = styled.h2`
  font-weight: 600;
  font-size: 36px;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TopButton = styled.button`
  padding: 5px;
  background-color: ${({ theme, type }) =>
    type === "checkout" ? theme.color : theme.bg};
  color: ${({ theme, type }) => (type === "checkout" ? theme.bg : theme.color)};
  border: 1px solid
    ${({ theme, type }) => (type === "checkout" ? theme.bg : theme.color)};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${({ type }) =>
      type === "checkout" ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.2)"};
  }

  &:active {
    background-color: ${({ type }) =>
      type === "checkout" ? "rgba(0, 0, 0, 0.9)" : "rgba(0, 0, 0, 0.4)"};
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

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 10px;
`;

const Info = styled.div`
  flex: 3;
`;

const Summary = styled.div`
  flex: 1;
  border: 1px solid ${({ theme }) => theme.color};
  border-radius: 5px;
  padding: 10px;
`;

const Product = styled.div`
  display: flex;
  justify-content: start;
`;

const ProductDetails = styled.div`
  flex: 3;
  display: flex;
  justify-content: start;
  align-items: start;
  gap: 20px;
`;

const Image = styled.img`
  width: 160px;
  height: auto;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 15px;
`;

const ProductName = styled.span`
  flex: 1;
`;

const ProductId = styled.span`
  flex: 1;
`;

const ProductColor = styled.div`
  border-radius: 50%;
  width: 20px;
  height: 20px;
  background-color: ${({ value }) => value};
`;

const ProductSize = styled.span`
  flex: 1;
`;

const BuyDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

const Price = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

const AmountContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Amount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SummaryItem = styled.p`
  font-size: 12px;
`;

function Cart() {
  return (
    <Container>
      <Title>Your cart</Title>
      <Top>
        <TopButton>Continue shopping</TopButton>
        <TextContainer>
          <Text>Shopping bag (2)</Text>
          <Text>Your wishlist (0)</Text>
        </TextContainer>
        <TopButton type="checkout">Checkout now</TopButton>
      </Top>
      <Bottom>
        <Info>
          <Product>
            <ProductDetails>
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Calico_cat_-_Phoebe.jpg"
                alt="cat image"
              />
              <Details>
                <ProductName>Product: Cat 1</ProductName>
                <ProductId>ID: 54875454</ProductId>
                <ProductColor value="grey" />
                <ProductSize>Size: XS</ProductSize>
              </Details>
            </ProductDetails>
            <BuyDetails>
              <AmountContainer>
                <Add />
                <Amount>2</Amount>
                <Remove />
              </AmountContainer>
              <Price>$200.00</Price>
            </BuyDetails>
          </Product>
        </Info>
        <Summary>
          <SummaryItem>Subtotal: $ 400.00</SummaryItem>
          <SummaryItem>Estimated shipping: $ 10.00</SummaryItem>
          <SummaryItem>Shipping discount: $ -10.00</SummaryItem>
          <SummaryItem>Total: $ 400.00</SummaryItem>
        </Summary>
      </Bottom>
    </Container>
  );
}

export default Cart;
