import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectAllPopular, selectPopularLoading } from "../popularSlice";
import ExpandElementButton from "../../../components/ExpandElementButton";
import PopularProduct from "./PopularProduct";
import Spinner from "../../../components/Spinner";
import { selectAllLikes } from "../../likedProducts/likedProductsSlice";

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
  max-height: ${({ showAll, maxHeight }) => (showAll ? maxHeight : "390px")};
  overflow: hidden;
  padding: 0 20px 20px 20px;
  gap: 1.6vh;
  transition: all 0.5s;
`;

function PopularProducts() {
  const [showAll, setShowAll] = useState(false);
  const popularProducts = useSelector(selectAllPopular);
  const likedProducts = useSelector(selectAllLikes).map((l) => l.productId);
  const popularProductsRef = useRef(null);
  const popularLoading = useSelector(selectPopularLoading);

  if (popularLoading) {
    return <Spinner />;
  }

  return (
    <MainContainer ref={popularProductsRef}>
      <Title>Popular products</Title>
      <ProductsContainer
        showAll={showAll}
        maxHeight={`${popularProducts.length * 410}px`}
      >
        {popularProducts.map((p) => (
          <PopularProduct
            key={p.id}
            product={p}
            liked={likedProducts.includes(p.id)}
          />
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
