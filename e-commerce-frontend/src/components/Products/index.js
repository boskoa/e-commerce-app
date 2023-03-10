import styled from "styled-components";
import { popularProducts } from "../../tempData";
import Product from "./Product";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

function Products() {
  return (
    <Container>
      {popularProducts.map((p) => (
        <Product key={p.id} product={p} />
      ))}
    </Container>
  );
}

export default Products;
