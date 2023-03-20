import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ExpandElementButton from "../../../components/ExpandElementButton";
import { selectAllCategories } from "../categoriesSlice";
import Category from "./Category";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  justify-content: space-between;
  max-height: ${({ showAll }) => (showAll ? "3000px" : "56vh")};
  overflow: hidden;
  gap: 1.6vh;
  transition: all 0.5s;
`;

function Categories() {
  const categories = useSelector(selectAllCategories);
  const [showAll, setShowAll] = useState(false);
  const categoriesRef = useRef(null);

  useEffect(() => {
    if (!showAll) {
      categoriesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showAll]);

  return (
    <Container showAll={showAll} ref={categoriesRef}>
      {categories.map((c) => (
        <Category key={c.id} category={c} />
      ))}
      <ExpandElementButton showAll={showAll} setShowAll={setShowAll} />
    </Container>
  );
}

export default Categories;
