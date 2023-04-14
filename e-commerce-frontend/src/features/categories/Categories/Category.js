import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  position: relative;
  flex: 1;
  margin: 5px;
  height: 50vh;
  min-width: 200px;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.01);
    box-shadow: 2px 2px 10px 0 black;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2`
  font-size: 40px;
  font-weight: 800;
  -webkit-text-stroke: 2px black;
  color: rgba(255, 255, 255, 1);
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.color};
  border: none;
  cursor: pointer;
  padding: 5px;
  font-weight: 600;
`;

function Category({ category }) {
  return (
    <Container>
      <Image
        src={`/data/defaults/categories/${category.id}.webp`}
        alt={"category image" + category.id}
      />
      <Info>
        <Title>{category.name}</Title>
        <Link to={`/category-products/${category.name}`}>
          <Button>SHOP NOW</Button>
        </Link>
      </Info>
    </Container>
  );
}

export default Category;
