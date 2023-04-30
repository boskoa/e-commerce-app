import ReactEcharts from "echarts-for-react";
import styled, { useTheme } from "styled-components";

const ChartContainer = styled.div`
  height: 160px;
  width: 280px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  box-shadow: 0 0 5px -1px black;
`;

function MonthChart({ sales }) {
  let chartData = {};
  const theme = useTheme();
  let today = new Date();
  today.setDate(today.getDate() - 30);
  chartData[`${today.getMonth() + 1}-${today.getDate()}`] = 0;

  for (let i = 30; i > 0; i--) {
    today.setDate(today.getDate() + 1);
    chartData[`${today.getMonth() + 1}-${today.getDate()}`] = 0;
  }
  const keys = Object.keys(chartData);
  sales.forEach((o) => {
    const key = o.updatedAt.slice(6, 10);
    if (keys.includes(key)) {
      const value = o.quantity;
      chartData[key] += value;
    }
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
      text: "Daily revenue for the past 30 days",
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

export default MonthChart;
