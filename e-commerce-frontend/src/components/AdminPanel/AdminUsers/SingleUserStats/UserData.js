import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectLoggedUser } from "../../../../features/login/loginSlice";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL as USER_URL } from "../../../../features/users/usersSlice";
import { BASE_URL as ORDERED_PRODUCTS_URL } from "../../../../features/orderedProducts/orderedProductsSlice";
import Spinner from "../../../Spinner";
import Trend from "../../AdminProducts/SingleProductStats/Trend";
import YearChart from "../../AdminProducts/SingleProductStats/YearChart";
import MonthChart from "../../AdminProducts/SingleProductStats/MonthChart";
import {
  ChartContainer,
  Container,
  Data,
  DataContainer,
} from "../../AdminProducts/SingleProductStats/ProductData";
import { Error } from "../../AdminProducts/SingleProductAdmin/ProductData";

function UserData() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [purchases, setPurchases] = useState([]);
  const [error, setError] = useState("");
  const admin = useSelector(selectLoggedUser);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `bearer ${admin.token}`,
      },
    };
    async function handleUserFetch() {
      if (!id) {
        setError("ID missing");
        return;
      }

      try {
        const response = await axios.get(`${USER_URL}/${id}`, config);
        setError("");
        setUser(response.data);
      } catch {
        setError("No such user");
      }
    }

    async function handleProductOrders() {
      if (!id) {
        setError("ID missing");
        return;
      }

      try {
        const response = await axios.get(
          `${ORDERED_PRODUCTS_URL}/purchases/${id}`,
          config
        );
        setError("");
        setPurchases(response.data);
      } catch {
        setError("User has not ordered anything yet");
      }
    }

    handleUserFetch();
    handleProductOrders();
  }, [id, admin]);

  if (error) {
    return <Error>{error}</Error>;
  }

  if (!Object.keys(user).length || !purchases.length) {
    return <Spinner />;
  }

  return (
    <Container>
      <DataContainer>
        <Data>
          <p>Name: </p>
          <p>{user.name}</p>
        </Data>
        <Data>
          <p>ID: </p>
          <p>{user.id}</p>
        </Data>
        <Data>
          <p>Username: </p>
          <p>{user.username}</p>
        </Data>
        <Data>
          <p>Total sales: </p>
          <p>{purchases.reduce((p, c) => p + c.quantity, 0)} pcs.</p>
        </Data>
        <Data>
          <p>Trend: </p>
          <Trend sales={purchases} />
        </Data>
      </DataContainer>
      <ChartContainer>
        <YearChart sales={purchases} />
        <MonthChart sales={purchases} />
      </ChartContainer>
    </Container>
  );
}

export default UserData;
