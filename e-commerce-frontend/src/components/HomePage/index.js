import Categories from "../../features/categories/Categories";
import PopularProducts from "../../features/popular/PopularProducts";
import Slider from "../../features/products/Slider";

function HomePage() {
  return (
    <div style={{ width: "100%" }}>
      <Slider />
      <Categories />
      <PopularProducts />
    </div>
  );
}

export default HomePage;
