import styled from "styled-components";
import { categories } from "../../tempData";
import Category from "./Category";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
`;

function Categories() {
  return (
    <Container>
      {categories.map((c) => (
        <Category key={c.id} category={c} />
      ))}
    </Container>
  );
}

export default Categories;
