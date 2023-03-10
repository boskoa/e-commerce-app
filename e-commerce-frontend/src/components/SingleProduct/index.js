import { Add, Remove } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { sliderItems } from "../../tempData";
import {
  Filter,
  FilterContainer,
  FilterText,
  Option,
  Select,
} from "../ProductList";

const Container = styled.div`
  display: flex;
  align-items: start;
  flex-wrap: wrap;
  gap: 15px;
  padding: 20px;
`;

const ImageContainer = styled.div`
  flex: 1;
  min-width: 200px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 20px;
`;

const Title = styled.h2`
  font-weight: 600;
  font-size: 36px;
`;

const Description = styled.p`
  font-size: 18px;
`;

const Price = styled.p`
  font-size: 30px;
  font-weight: 800;
  margin-top: 40px;
`;

const ColorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const Color = styled.input`
  appearance: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  border: 2px solid ${({ value }) => value};
  transition: 0.2s all linear;

  &:checked {
    background-color: ${({ value }) => value};
  }
`;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Amount = styled.p`
  border: 1px solid ${({ theme }) => theme.color};
  padding: 2px;
  text-align: center;
  width: 30px;
`;

const Button = styled.button`
  padding: 5px;
  background-color: inherit;
  color: ${({ theme }) => theme.color};
  border: 1px solid ${({ theme }) => theme.color};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

function SingleProduct() {
  const { id } = useParams();
  const product = sliderItems[id];

  return (
    <Container>
      <ImageContainer>
        <Image alt="product image" src={product.img} />
      </ImageContainer>
      <Info>
        <Title>{product.title}</Title>
        <Description>{product.desc}</Description>
        <Price>$200.00</Price>
        <FilterContainer>
          <Filter style={{ marginRight: "5px" }}>
            <FilterText>Color</FilterText>
            <ColorContainer>
              <Color type="radio" id="color1" name="color" value="red" />
              <Color type="radio" id="color2" name="color" value="green" />
              <Color type="radio" id="color3" name="color" value="blue" />
            </ColorContainer>
          </Filter>
          <Filter>
            <FilterText>Size</FilterText>
            <Select defaultValue="size">
              <Option value="size" disabled>
                Size
              </Option>
              <Option>Small</Option>
              <Option>Medium</Option>
              <Option>Large</Option>
            </Select>
          </Filter>
        </FilterContainer>
        <AddContainer>
          <AmountContainer>
            <Remove style={{ cursor: "pointer" }} />
            <Amount>1</Amount>
            <Add style={{ cursor: "pointer" }} />
          </AmountContainer>
          <Button>Add to cart</Button>
        </AddContainer>
      </Info>
    </Container>
  );
}

export default SingleProduct;
