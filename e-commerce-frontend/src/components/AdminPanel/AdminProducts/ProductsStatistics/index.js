import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../../features/orderedProducts/orderedProductsSlice";
import Bestsellers from "./Bestsellers";
import BestEarners from "./BestEarners";
import styled from "styled-components";
import Dates from "./Dates";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  gap: 10px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  @media only screen and (max-width: 800px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Error = styled.div`
  height: 20px;
  text-align: center;
  color: red;
`;

function ProductsStatistics() {
  const [bestsellers, setBestsellers] = useState([]);
  const [bestEarners, setBestEarners] = useState([]);
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
        `${BASE_URL}/bestsellers?start=${startQuery ? startQuery : "0"}&end=${
          endQuery ? endQuery : "0"
        }`
      );
      setBestsellers(response.data);
    }

    async function getBestEarners() {
      const response = await axios.get(
        `${BASE_URL}/best-earners?start=${startQuery ? startQuery : "0"}&end=${
          endQuery ? endQuery : "0"
        }`
      );
      setBestEarners(response.data);
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
        <Bestsellers bestsellers={bestsellers} />
        <BestEarners bestEarners={bestEarners} />
      </Container>
    </MainContainer>
  );
}

export default ProductsStatistics;
