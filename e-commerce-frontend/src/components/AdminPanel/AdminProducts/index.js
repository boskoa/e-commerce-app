import styled from "styled-components";
import { Button } from "../styledElements";
import { Outlet, useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 10px;
  width: 100%;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
`;

function AdminProducts() {
  const navigate = useNavigate();

  return (
    <Container>
      <ButtonsContainer>
        <Button onClick={() => navigate("all")}>Browse products</Button>
        <Button onClick={() => navigate("single")}>
          Update single product
        </Button>
        <Button onClick={() => navigate("statistics")}>
          Products statistics
        </Button>
        <Button onClick={() => navigate("single-stats")}>
          Single product stats
        </Button>
      </ButtonsContainer>
      <Outlet />
    </Container>
  );
}

export default AdminProducts;
