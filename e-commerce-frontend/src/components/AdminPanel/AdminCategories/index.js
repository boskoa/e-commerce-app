import { useSelector } from "react-redux";
import { selectAllCategories } from "../../../features/categories/categoriesSlice";
import CategoryComponent from "./CategoryComponent";
import styled from "styled-components";
import NewCategory from "./NewCategory";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 10px;
  transition: all 0.3s;
`;

const CategoriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  justify-content: center;
  align-content: start;
  gap: 15px;
  transition: all 0.3s;
`;

function AdminCategories() {
  const categories = useSelector(selectAllCategories);

  return (
    <Container>
      <NewCategory />
      <CategoriesContainer>
        {categories.map((c) => (
          <CategoryComponent c={c} key={c.id} />
        ))}
      </CategoriesContainer>
    </Container>
  );
}

export default AdminCategories;
