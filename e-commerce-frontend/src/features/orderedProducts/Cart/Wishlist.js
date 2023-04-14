import { useSelector } from "react-redux";
import { selectAllLikes } from "../../likedProducts/likedProductsSlice";
import { ProductContainer } from "../../products/ProductList";
import Product from "../../products/ProductList/Product";

function Wishlist() {
  const likedProducts = useSelector(selectAllLikes);

  return (
    <ProductContainer>
      {likedProducts.map((p) => (
        <Product key={p.id} product={p.product} />
      ))}
    </ProductContainer>
  );
}

export default Wishlist;
