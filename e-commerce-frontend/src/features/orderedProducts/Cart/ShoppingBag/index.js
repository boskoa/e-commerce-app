import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectAllOrderedProducts } from "../../orderedProductsSlice";
import InfoComponent from "./InfoComponent";
import SummaryComponent from "./SummaryComponent";
import TopComponent from "./TopComponent";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Bottom = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: start;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 10px;
`;

const ProductsContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: stretch;
  gap: 20px;
`;

function ShoppingBag() {
  const selectedProducts = useSelector(selectAllOrderedProducts);
  const [checked, setChecked] = useState([]);
  const checkedProducts = selectedProducts.filter((o) =>
    checked.includes(o.id)
  );

  return (
    <Container>
      <TopComponent setChecked={setChecked} checkedProducts={checkedProducts} />
      <Bottom>
        <ProductsContainer>
          {selectedProducts?.map((p, i) => (
            <InfoComponent
              key={p.id}
              p={p}
              last={selectedProducts.length === i + 1}
              checked={checked}
              setChecked={setChecked}
            />
          ))}
        </ProductsContainer>
        <SummaryComponent checkedProducts={checkedProducts} />
      </Bottom>
    </Container>
  );
}

export default ShoppingBag;
