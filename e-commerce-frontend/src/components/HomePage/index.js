import Categories from "../Categories";
import Products from "../Products";
import Slider from "../Slider";

function HomePage() {
  return (
    <div style={{ width: "100%" }}>
      <Slider />
      <Categories />
      <Products />
    </div>
  );
}

export default HomePage;
