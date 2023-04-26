import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../../features/orderedProducts/orderedProductsSlice";

function ProductsStatistics() {
  const [bestsellers, setBestsellers] = useState([]);
  const [bestEarners, setBestEarners] = useState([]);

  useEffect(() => {
    async function getBestsellers() {
      const response = await axios.get(`${BASE_URL}/bestsellers`);
      setBestsellers(response.data);
    }

    async function getBestEarners() {
      const response = await axios.get(`${BASE_URL}/best-earners`);
      setBestEarners(response.data);
    }

    getBestsellers();
    getBestEarners();
  }, []);

  return (
    <div>
      {bestsellers.map((b) => (
        <p key={b.id}>
          Name: {b.product.title}, sold: {b.count_products}
        </p>
      ))}
      {bestEarners.map((b) => (
        <p key={b.id}>
          Name: {b.title}, revenue: {b.total_amount}
        </p>
      ))}
    </div>
  );
}

export default ProductsStatistics;
