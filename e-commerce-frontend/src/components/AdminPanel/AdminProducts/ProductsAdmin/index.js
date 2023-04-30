import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllCategories } from "../../../../features/categories/categoriesSlice";
import useIntersectionObserver from "../../../../customHooks/useIntersectionObserver";
import {
  emptyProducts,
  getAllProducts,
  selectAllProducts,
  selectProductsLoading,
} from "../../../../features/products/productsSlice";
import axios from "axios";
import styled from "styled-components";
import SelectComponent from "../../../../features/products/ProductList/SelectComponent";
import Spinner from "../../../Spinner";
import SingleProductComponent from "./SingleProductComponent";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: start;
  gap: 20px;
  width: 100%;
  padding: 20px;
  color: ${({ theme }) => theme.color};
  transition: all 0.3s;
`;

export const FilterContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 20px;

  @media only screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

export const Filter = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  @media only screen and (max-width: 400px) {
    flex-direction: column;
    align-items: start;
  }
`;

export const FilterText = styled.p`
  font-size: 18px;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  justify-content: start;
  gap: 15px;
  transition: all 0.3s;
`;

export const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  width: 100%;
  margin-top: auto;
`;

function ProductsAdmin() {
  const [offset, setOffset] = useState(0);
  const [stopLoading, setStopLoading] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const loading = useSelector(selectProductsLoading);
  const endRef = useRef(null);
  const intersecting = useIntersectionObserver(endRef);
  const limit = 4;
  const categories = useSelector(selectAllCategories).map((c) => c.name);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const sorts = useMemo(
    () => ({
      "price (asc)": ["price,ASC"],
      "price (desc)": ["price,DESC"],
      newest: ["createdAt,DESC"],
      oldest: ["createdAt,ASC"],
    }),
    []
  );
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    setOffset(0);
    dispatch(emptyProducts());
  }, [category, color, size, sort, dispatch]);

  useEffect(() => {
    async function fetchColorsSizes() {
      const response = await axios.get("/api/products/colors-sizes");
      setColors(response.data.uniqueColors);
      setSizes(response.data.uniqueSizes);
    }
    fetchColorsSizes();
  }, []);

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
      dispatch(
        getAllProducts(
          `?pagination=${offset},${limit}${
            category ? `&category=${category}` : ""
          }${color ? `&color=${color}` : ""}${size ? `&size=${size}` : ""}${
            sort ? `&order=${sorts[sort]}` : ""
          }`
        )
      );
    }
  }, [offset, products.length, category, color, size, sort, sorts, dispatch]);

  return (
    <Container>
      <FilterContainer>
        <Filter>
          <FilterText>Filter products</FilterText>
          <SelectComponent
            defaultValue="categories"
            setValue={setCategory}
            values={categories}
          />
          <SelectComponent
            defaultValue="colors"
            setValue={setColor}
            values={colors}
          />
          <SelectComponent
            defaultValue="sizes"
            setValue={setSize}
            values={sizes}
          />
        </Filter>
        <Filter>
          <FilterText>Sort by</FilterText>
          <SelectComponent
            defaultValue="criterium"
            setValue={setSort}
            values={Object.keys(sorts)}
          />
        </Filter>
      </FilterContainer>
      <ProductContainer>
        {products.map((p) => (
          <SingleProductComponent key={p.id} product={p} />
        ))}
      </ProductContainer>
      <SpinnerContainer ref={endRef}>{loading && <Spinner />}</SpinnerContainer>
    </Container>
  );
}

export default ProductsAdmin;
