import styled from "styled-components";
import { Input } from "../../styledElements";
import { TopButton } from "../../../../features/orderedProducts/Cart/ShoppingBag/TopComponent";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: 0 auto;
  min-height: 700px;
  gap: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  gap: 10px;
`;

function SingleProductStats() {
  const { id } = useParams();
  const [productId, setProductId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setProductId(id);
    } else {
      setProductId("");
    }
  }, [id]);

  return (
    <Container>
      <InputContainer>
        <Input
          placeholder="Enter product ID"
          type="text"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <TopButton type="checkout" onClick={() => navigate(productId)}>
          Fetch
        </TopButton>
      </InputContainer>
      <Outlet />
    </Container>
  );
}

export default SingleProductStats;
