import styled from "styled-components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectLoggedUser } from "../../../../features/login/loginSlice";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL as PRODUCT_URL } from "../../../../features/products/productsSlice";
import { BASE_URL as ORDERED_PRODUCTS_URL } from "../../../../features/orderedProducts/orderedProductsSlice";
import { Error } from "../SingleProductAdmin/ProductData";
import { formatter } from "../ProductsStatistics/BestEarners";
import YearChart from "./YearChart";
import MonthChart from "./MonthChart";
import Trend from "./Trend";
import Spinner from "../../../Spinner";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 100%;
`;

export const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  gap: 10px;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 5px;
  border-radius: 3px;
  box-shadow: 0 0 5px -1px black;
`;

export const Data = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`;

function ProductData() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [sales, setSales] = useState([]);
  const [error, setError] = useState("");
  const admin = useSelector(selectLoggedUser);

  useEffect(() => {
    async function handleProductFetch() {
      if (!id) {
        setError("ID missing");
        return;
      }

      try {
        const response = await axios.get(`${PRODUCT_URL}/${id}`);
        setError("");
        setProduct(response.data);
      } catch {
        setError("No such product");
      }
    }

    async function handleProductOrders() {
      if (!id) {
        setError("ID missing");
        return;
      }

      try {
        const config = {
          headers: {
            Authorization: `bearer ${admin.token}`,
          },
        };
        const response = await axios.get(
          `${ORDERED_PRODUCTS_URL}/sales/${id}`,
          config
        );
        setError("");
        setSales(response.data);
      } catch {
        setError("No such product was ordered");
      }
    }

    handleProductFetch();
    handleProductOrders();
  }, [id, admin]);

  if (error) {
    return <Error>{error}</Error>;
  }

  if (!Object.keys(product).length || !sales.length) {
    return <Spinner />;
  }

  return (
    <Container>
      <DataContainer>
        <Data>
          <p>Name: </p>
          <p>{product.title}</p>
        </Data>
        <Data>
          <p>ID: </p>
          <p>{product.id}</p>
        </Data>
        <Data>
          <p>Price: </p>
          <p>{formatter.format(product.price)}</p>
        </Data>
        <Data>
          <p>Total sales: </p>
          <p>{sales.reduce((p, c) => p + c.quantity, 0)} pcs.</p>
        </Data>
        <Data>
          <p>Trend: </p>
          <Trend sales={sales} />
        </Data>
      </DataContainer>
      <ChartContainer>
        <YearChart sales={sales} />
        <MonthChart sales={sales} />
      </ChartContainer>
    </Container>
  );
}

export default ProductData;
