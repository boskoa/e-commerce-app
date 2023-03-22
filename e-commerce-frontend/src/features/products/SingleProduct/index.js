import { Add, Remove } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  getSelectedProduct,
  selectProductsLoading,
  selectSelectedProduct,
} from "../productsSlice";
import Spinner from "../../../components/Spinner";
import { useEffect } from "react";

const Container = styled.div`
  display: flex;
  align-items: start;
  flex-wrap: wrap;
  gap: 15px;
  color: ${({ theme }) => theme.color};
  transition: all 0.3s;
`;

const ImageContainer = styled.div`
  flex: 1;
  min-width: 200px;
  align-self: stretch;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
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

const OptionsContainer = styled.div`
  margin: 20px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
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

const Filter = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const FilterText = styled.p`
  font-size: 18px;
`;

const Select = styled.select`
  background-color: inherit;
  color: inherit;
  border: 1px solid ${({ theme }) => theme.color};
  padding: 5px;
`;

const Option = styled.option``;

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
  const product = useSelector(selectSelectedProduct);
  const loading = useSelector(selectProductsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSelectedProduct(id));
    window.scrollTo({ top: -100, behavior: "smooth" });
  }, [dispatch, id]);

  if (!Object.keys(product).length || loading) {
    return <Spinner />;
  }

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
        <Price>${product.price}</Price>
      </Info>
      <OptionsContainer>
        <Filter style={{ marginRight: "5px" }}>
          <FilterText>Color</FilterText>
          <ColorContainer>
            {product.colors.map((c, i) => (
              <Color
                key={c}
                type="radio"
                id={`color${i}`}
                name="color"
                value={c}
              />
            ))}
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
        <AmountContainer>
          <Remove style={{ cursor: "pointer" }} />
          <Amount>1</Amount>
          <Add style={{ cursor: "pointer" }} />
        </AmountContainer>
        <Button>Add to cart</Button>
      </OptionsContainer>
    </Container>
  );
}

export default SingleProduct;
