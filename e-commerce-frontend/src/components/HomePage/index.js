import Categories from "../../features/categories/Categories";
import PopularProducts from "../PopularProducts";
import Slider from "../Slider";

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
