import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ExpandElementButton from "../../../components/ExpandElementButton";
import Spinner from "../../../components/Spinner";
import {
  selectAllCategories,
  selectCategoriesLoading,
} from "../categoriesSlice";
import Category from "./Category";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  justify-content: space-between;
  max-height: ${({ showAll, maxHeight }) => (showAll ? maxHeight : "56vh")};
  overflow: hidden;
  gap: 1.6vh;
  transition: all 0.5s;
`;

function Categories() {
  const categories = useSelector(selectAllCategories);
  const [showAll, setShowAll] = useState(false);
  const categoriesRef = useRef(null);
  const categoriesLoading = useSelector(selectCategoriesLoading);

  if (categoriesLoading) {
    return <Spinner />;
  }

  return (
    <Container
      showAll={showAll}
      maxHeight={`${categories.length * 55}vh`}
      ref={categoriesRef}
    >
      {categories.map((c) => (
        <Category key={c.id} category={c} />
      ))}
      <ExpandElementButton
        element={categoriesRef.current}
        showAll={showAll}
        setShowAll={setShowAll}
      />
    </Container>
  );
}

export default Categories;
