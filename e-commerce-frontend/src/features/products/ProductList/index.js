import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Spinner from "../../../components/Spinner";
import useIntersectionObserver from "../../../customHooks/useIntersectionObserver";
import {
  getAllProducts,
  selectAllProducts,
  selectProductsLoading,
} from "../productsSlice";
import Product from "./Product";
import SelectComponent from "./SelectComponent";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: start;
  gap: 20px;
  min-height: 100vh;
  width: 100%;
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
  gap: 20px;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  @media only screen and (max-width: 400px) {
    flex-direction: column;
    align-items: start;
  }
`;

const FilterText = styled.p`
  font-size: 18px;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 15px;
  min-height: 100%;
  transition: all 0.3s;
`;

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
  const [category, setCategory] = useState(""); //selektor svih kategorija (iz slajsa)
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [sort, setSort] = useState(""); //napraviti erej [cena naviše, cena naniže, najnovije, najstarije]
  const options = useMemo(() => {
    /*
    axios za izvlačenje svih boja
    axios za izvlačenje svih veličina
    */
  });

  useEffect(() => {
    console.log(category);
  }, [category]);

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
      <Title>All products</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter products</FilterText>
          <SelectComponent defaultValue="category" setValue={setCategory} />
          <SelectComponent defaultValue="color" />
          <SelectComponent defaultValue="size" />
        </Filter>
        <Filter>
          <FilterText>Sort by</FilterText>
          <SelectComponent defaultValue="criterium" />
        </Filter>
      </FilterContainer>
      <ProductContainer>
        {products.map((p) => (
          <Product key={p.id} product={p} />
        ))}
      </ProductContainer>
      <SpinnerContainer ref={endRef}>{loading && <Spinner />}</SpinnerContainer>
    </Container>
  );
}

export default ProductList;
