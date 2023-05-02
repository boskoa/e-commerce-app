import ReactEcharts from "echarts-for-react";
import styled, { useTheme } from "styled-components";

const ChartContainer = styled.div`
  height: 160px;
  width: 280px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  box-shadow: 0 0 5px -1px black;
`;

function YearChart({ sales }) {
  let chartData = {};
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const theme = useTheme();

  for (let j = year - 1; j <= year; j++) {
    for (let i = 1; i <= 12; i++) {
      if (j === year && i > month) {
        break;
      }
      chartData[`${j}-${i}`] = 0;
    }
  }

  sales.forEach((o) => {
    const key = `${new Date(o.updatedAt).getFullYear()}-${
      new Date(o.updatedAt).getMonth() + 1
    }`;
    const value = o.quantity;
    chartData[key] += value;
  });

  const option = {
    animationDuration: 2000,
    height: "20%",
    grid: { show: false },
    xAxis: {
      type: "category",
      show: false,
      splitLine: {
        show: false,
      },
      showGrid: false,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      data: [...Object.keys(chartData)],
    },
    yAxis: {
      type: "value",
      show: false,
      splitLine: {
        show: false,
      },
      showGrid: false,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    tooltip: {
      trigger: "axis",
    },
    series: [
      {
        data: [...Object.values(chartData)],
        type: "line",
        showSymbol: false,
      },
    ],
    title: {
      text: "Monthly sales since the last year",
      textStyle: {
        color: theme.color,
        fontSize: "14px",
        fontWeight: "normal",
        fontFamily: "urbanist",
      },
    },
  };

  return (
    <ChartContainer>
      <ReactEcharts option={option} />
    </ChartContainer>
  );
}

export default YearChart;
