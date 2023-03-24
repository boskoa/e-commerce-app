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
import ImageComponent from "./ImageComponent";
import InfoComponent from "./InfoComponent";
import OptionsComponent from "./OptionsComponent";

const Container = styled.div`
  display: flex;
  align-items: start;
  flex-wrap: wrap;
  gap: 15px;
  color: ${({ theme }) => theme.color};
  transition: all 0.3s;
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
      <ImageComponent product={product} height="100%" />
      <InfoComponent product={product} />
      <OptionsComponent product={product} />
    </Container>
  );
}

export default SingleProduct;
