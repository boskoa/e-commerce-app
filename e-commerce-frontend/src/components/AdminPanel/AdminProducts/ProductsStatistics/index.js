import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../../features/orderedProducts/orderedProductsSlice";

function ProductsStatistics() {
  const [bestsellers, setBestsellers] = useState([]);

  useEffect(() => {
    async function getBestsellers() {
      const response = await axios.get(`${BASE_URL}/bestsellers`);
      setBestsellers(response.data);
    }

    getBestsellers();
  }, []);

  return (
    <div>
      {bestsellers.map((b) => (
        <p key={b.id}>
          Name: {b.product.title}, sold: {b.count_products}
        </p>
      ))}
    </div>
  );
}

export default ProductsStatistics;
