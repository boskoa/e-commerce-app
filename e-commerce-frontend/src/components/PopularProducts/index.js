import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../../tempData";
import ExpandElementButton from "../ExpandElementButton";
import PopularProduct from "./PopularProduct";

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
  const popularProductsRef = useRef(null);

  useEffect(() => {
    if (!showAll) {
      popularProductsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showAll]);

  return (
    <MainContainer ref={popularProductsRef}>
      <Title>Popular products</Title>
      <ProductsContainer showAll={showAll}>
        {popularProducts.map((p) => (
          <PopularProduct key={p.id} product={p} />
        ))}
        <ExpandElementButton showAll={showAll} setShowAll={setShowAll} />
      </ProductsContainer>
    </MainContainer>
  );
}

export default PopularProducts;
