import styled from "styled-components";
import { Button } from "../styledElements";
import { useState } from "react";
import SingleProductAdmin from "./SingleProductAdmin";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 10px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
`;

function AdminProducts() {
  const [option, setOption] = useState("");

  return (
    <Container>
      <ButtonsContainer>
        <Button onClick={() => setOption("single")}>Get single product</Button>
        <Button>Browse products</Button>
        <Button>foo</Button>
        <Button>bar</Button>
        <Button>foo</Button>
        <Button>bar</Button>
      </ButtonsContainer>
      {option === "single" && <SingleProductAdmin />}
    </Container>
  );
}

export default AdminProducts;
