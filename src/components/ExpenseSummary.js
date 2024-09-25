import React from "react";
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpenseSummary({ transactions }) {
  const categories = ["Food", "Entertainment", "Utilities", "Others"];
  
  const amountsByCategory = categories.map((category) =>
    transactions
      .filter((t) => t.category === category)
      .reduce((acc, curr) => acc + Number(curr.amount), 0)
  );

  const data = {
    labels: categories,
    datasets: [
      {
        label: "Spending by Category",
        data: amountsByCategory,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };


  return (
    <div>
      <h3>Expense Summary</h3>
      {console.log(data)}
      <Pie data={data} />
    </div>
  );
}
