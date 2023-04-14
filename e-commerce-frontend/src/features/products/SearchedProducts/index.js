import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../components/Spinner";
import useIntersectionObserver from "../../../customHooks/useIntersectionObserver";
import {
  emptyProducts,
  getAllProducts,
  selectAllProducts,
  selectProductsLoading,
} from "../../products/productsSlice";
import Product from "../../products/ProductList/Product";
import { useParams } from "react-router-dom";
import {
  Container,
  ProductContainer,
  SpinnerContainer,
  Title,
} from "../../products/ProductList";

function SearchedProducts() {
  const [offset, setOffset] = useState(0);
  const [stopLoading, setStopLoading] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const loading = useSelector(selectProductsLoading);
  const endRef = useRef(null);
  const intersecting = useIntersectionObserver(endRef);
  const limit = 4;
  const { title } = useParams();

  useEffect(() => {
    setOffset(0);
    dispatch(emptyProducts());
    window.scrollTo(0, 0);
  }, [title, dispatch]);

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
    if (offset === products.length && title) {
      dispatch(
        getAllProducts(
          `?pagination=${offset},${limit}${title ? `&title=${title}` : ""}`
        )
      );
    }
  }, [offset, products.length, title, dispatch]);

  return (
    <Container>
      <Title>
        Search results for products named: {title.split(",").join(" ")}
      </Title>
      <ProductContainer>
        {products.map((p) => (
          <Product key={p.id} product={p} />
        ))}
      </ProductContainer>
      <SpinnerContainer ref={endRef}>{loading && <Spinner />}</SpinnerContainer>
    </Container>
  );
}

export default SearchedProducts;
