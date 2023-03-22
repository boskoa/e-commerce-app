import styled from "styled-components";
import Categories from "../../features/categories/Categories";
import PopularProducts from "../../features/popular/PopularProducts";
import Slider from "../../features/products/Slider";

const Container = styled.div`
  width: "100%";
`;

function HomePage() {
  return (
    <Container>
      <Slider />
      <Categories />
      <PopularProducts />
    </Container>
  );
}

export default HomePage;
