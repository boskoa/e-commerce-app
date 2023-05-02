import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import {
  Container,
  Error,
  MainContainer,
} from "../../AdminProducts/ProductsStatistics";
import Dates from "../../AdminProducts/ProductsStatistics/Dates";
import { BASE_URL } from "../../../../features/orderedProducts/orderedProductsSlice";
import MostItems from "./MostItems";
import MoneySpent from "./MoneySpent";

function UsersStatistics() {
  const [mostItems, setMostItems] = useState([]);
  const [moneySpent, setMoneySpent] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [error, setError] = useState("");
  const [startQuery, setStartQuery] = useState("");
  const [endQuery, setEndQuery] = useState("");

  function handleDateObjects() {
    const startCheck = isNaN(Date.parse(start));
    const endCheck = isNaN(Date.parse(end));
    const startRegex = /[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(start);
    const endRegex = /[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(end);

    if (start && (startCheck || !startRegex)) {
      setError("Invalid start date format");
      return;
    }

    if (end && (endCheck || !endRegex)) {
      setError("Invalid end date format");
      return;
    }

    setStartQuery(start);
    setEndQuery(end);
  }

  useEffect(() => {
    async function getBestsellers() {
      const response = await axios.get(
        `${BASE_URL}/most-items?start=${startQuery ? startQuery : "0"}&end=${
          endQuery ? endQuery : "0"
        }`
      );
      setMostItems(response.data);
    }

    async function getBestEarners() {
      const response = await axios.get(
        `${BASE_URL}/money-spent?start=${startQuery ? startQuery : "0"}&end=${
          endQuery ? endQuery : "0"
        }`
      );
      setMoneySpent(response.data);
    }

    getBestsellers();
    getBestEarners();
  }, [startQuery, endQuery]);

  useEffect(() => {
    const index = setTimeout(() => setError(""), 4000);

    return () => clearTimeout(index);
  }, [error]);

  return (
    <MainContainer>
      <Dates
        start={start}
        setStart={setStart}
        end={end}
        setEnd={setEnd}
        handleDateObjects={handleDateObjects}
      />
      <Error>{error}</Error>
      <Container>
        <MostItems mostItems={mostItems} />
        <MoneySpent moneySpent={moneySpent} />
      </Container>
    </MainContainer>
  );
}

export default UsersStatistics;
