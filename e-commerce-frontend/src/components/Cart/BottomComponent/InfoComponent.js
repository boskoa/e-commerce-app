import styled from "styled-components";
import { Add, Remove } from "@mui/icons-material";

const Product = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-width: 60%;
  justify-content: space-between;
  gap: 20px;
`;

const ProductDetails = styled.div`
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

function InfoComponent() {
  return (
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
  );
}

export default InfoComponent;
