import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Spinner from "../../../components/Spinner";
import useIntersectionObserver from "../../../customHooks/useIntersectionObserver";
import Products from "../../popular/PopularProducts";
import {
  getAllProducts,
  selectAllProducts,
  selectProductsLoading,
} from "../productsSlice";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 5px;
  min-height: 100vh;
  padding: 20px;
  background-image: ${({ theme }) =>
    `linear-gradient(-200deg, ${theme.base[0]}, ${theme.base[1]} 30%)`};
  color: ${({ theme }) => theme.color};
  transition: all 0.3s;
`;

const Title = styled.h2`
  font-weight: 600;
  font-size: 36px;
`;

const FilterContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
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

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  width: 100%;
  margin-top: auto;
`;

function ProductList() {
  const [offset, setOffset] = useState(0);
  const [stopLoading, setStopLoading] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const loading = useSelector(selectProductsLoading);
  const endRef = useRef(null);
  const intersecting = useIntersectionObserver(endRef);
  const limit = 4;

  useEffect(() => {
    if (intersecting && !stopLoading) {
      setOffset((prev) => prev + limit);
    }
  }, [intersecting, stopLoading]);

  useEffect(() => {
    if (offset - limit > products.length) {
      setStopLoading(true);
    } else {
      setStopLoading(false);
    }
  }, [offset, products.length]);

  useEffect(() => {
    if (offset === products.length) {
      dispatch(getAllProducts(`?pagination=${offset},${limit}`));
    }
  }, [offset, products.length, dispatch]);

  return (
    <Container>
      <Title>Cats</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter products</FilterText>
          <Select defaultValue="color">
            <Option value="color" disabled>
              Color
            </Option>
            <Option value="red">Red</Option>
            <Option value="green">Green</Option>
            <Option value="blue">Blue</Option>
          </Select>
          <Select defaultValue="size">
            <Option value="size" disabled>
              Size
            </Option>
            <Option>Small</Option>
            <Option>Medium</Option>
            <Option>Large</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort by</FilterText>
          <Select>
            <Option>Newest</Option>
            <Option>Price (asc)</Option>
            <Option>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      {/*<Products />*/}
      {products.map((p) => (
        <div key={p.id} style={{ height: "400px" }}>
          {p.title}
          <img
            height="100px"
            src={`/data/uploads/products/${p.id}.webp`}
            alt={p.id}
          />
        </div>
      ))}
      <SpinnerContainer ref={endRef}>{loading && <Spinner />}</SpinnerContainer>
    </Container>
  );
}

export default ProductList;
