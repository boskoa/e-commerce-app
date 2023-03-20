import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectAllPopular, selectPopularLoading } from "../popularSlice";
import ExpandElementButton from "../../../components/ExpandElementButton";
import PopularProduct from "./PopularProduct";
import Spinner from "../../../components/Spinner";

const MainContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h3`
  padding-top: 20px;
`;

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-height: ${({ showAll }) => (showAll ? "3000px" : "53vh")};
  overflow: hidden;
  padding: 0 20px 20px 20px;
  gap: 1.6vh;
  transition: all 0.5s;
`;

function PopularProducts() {
  const [showAll, setShowAll] = useState(false);
  const popularProducts = useSelector(selectAllPopular);
  const popularProductsRef = useRef(null);
  const popularLoading = useSelector(selectPopularLoading);

  if (popularLoading) {
    return <Spinner />;
  }

  return (
    <MainContainer ref={popularProductsRef}>
      <Title>Popular products</Title>
      <ProductsContainer showAll={showAll}>
        {popularProducts.map((p) => (
          <PopularProduct key={p.id} product={p} />
        ))}
        <ExpandElementButton
          element={popularProductsRef.current}
          showAll={showAll}
          setShowAll={setShowAll}
        />
      </ProductsContainer>
    </MainContainer>
  );
}

export default PopularProducts;
