import React from "react";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { dateFormat } from "../../utils/dateFormat";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Chart() {
  const { incomes, expenses } = useGlobalContext();

  // Combine incomes and expenses to get a complete date array
  const combinedData = [...incomes, ...expenses];

  // Sort combined data by date in ascending order
  combinedData.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Extract unique dates after sorting
  const uniqueDates = [
    ...new Set(combinedData.map((item) => dateFormat(item.date))),
  ];

  // Filter incomes and expenses by unique dates
  const sortedIncomes = uniqueDates.map((date) => {
    const income = incomes.find((inc) => dateFormat(inc.date) === date);
    return income ? income.amount : 0;
  });

  const sortedExpenses = uniqueDates.map((date) => {
    const expense = expenses.find((exp) => dateFormat(exp.date) === date);
    return expense ? expense.amount : 0;
  });

  const data = {
    labels: uniqueDates,
    datasets: [
      {
        label: "Income",
        data: sortedIncomes,
        backgroundColor: "green",
        tension: 0.2,
      },
      {
        label: "Expenses",
        data: sortedExpenses,
        backgroundColor: "red",
        tension: 0.2,
      },
    ],
  };

  return (
    <ChartStyled>
      <Line data={data} />
    </ChartStyled>
  );
}

const ChartStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 20px;
  height: 100%;
`;

export default Chart;
