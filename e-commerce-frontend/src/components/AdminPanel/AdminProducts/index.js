import styled from "styled-components";
import { Button } from "../styledElements";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

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
  const location = useLocation().pathname.split("/").pop();

  return (
    <Container>
      <ButtonsContainer>
        <Button active={location === "all"} onClick={() => navigate("all")}>
          Browse products
        </Button>
        <Button
          active={location === "single"}
          onClick={() => navigate("single")}
        >
          Update single product
        </Button>
        <Button
          active={location === "statistics"}
          onClick={() => navigate("statistics")}
        >
          Products statistics
        </Button>
        <Button
          active={location === "single-stats"}
          onClick={() => navigate("single-stats")}
        >
          Single product stats
        </Button>
      </ButtonsContainer>
      <Outlet />
    </Container>
  );
}

export default AdminProducts;
