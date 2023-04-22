import styled from "styled-components";
import { Input } from "../styledElements";
import { TopButton } from "../../../features/orderedProducts/Cart/ShoppingBag/TopComponent";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../features/products/productsSlice";
import ProductData from "./ProductData";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  gap: 10px;
`;

const Error = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  width: 100%;
`;

function SingleProductAdmin() {
  const [product, setProduct] = useState({});
  const [id, setId] = useState("");
  const [error, setError] = useState("");

  async function handleProductFetch() {
    if (!id) {
      setError("ID missing");
      return;
    }

    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      setError("");
      setProduct(response.data);
    } catch {
      setError("No such product");
    }
  }

  return (
    <Container>
      <InputContainer>
        <Input
          placeholder="Enter product ID"
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <TopButton type="checkout" onClick={handleProductFetch}>
          Fetch
        </TopButton>
      </InputContainer>
      {product.id && <ProductData product={product} />}
      {error && <Error>{error}</Error>}
    </Container>
  );
}

export default SingleProductAdmin;
