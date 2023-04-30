import styled from "styled-components";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import { useEffect, useState } from "react";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  padding: 1px;
`;

function Trend({ sales }) {
  const [trend, setTrend] = useState("");

  useEffect(() => {
    const currentMonth = sales.filter(
      (s) => new Date(s.updatedAt).getMonth() === new Date().getMonth()
    ).length;
    const previousMonth = sales.filter(
      (s) => new Date(s.updatedAt).getMonth() === new Date().getMonth() - 1
    ).length;
    if (currentMonth > previousMonth) {
      setTrend("up");
    }
    if (currentMonth === previousMonth) {
      setTrend("same");
    }
    if (currentMonth < previousMonth) {
      setTrend("down");
    }
  }, [sales]);

  return (
    <Container>
      {trend === "up" && <TrendingUpIcon color="success" />}
      {trend === "same" && <TrendingFlatIcon color="warning" />}
      {trend === "down" && <TrendingDownIcon color="error" />}
    </Container>
  );
}

export default Trend;
