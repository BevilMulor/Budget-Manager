import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpenseSummary({ transactions, budgetLimits, alerts }) {
  const categories = ["Food", "Entertainment", "Utilities", "Others"];

  const categoryColors = {
    Food: "#FF6384",          // Red for Food
    Entertainment: "#36A2EB", // Blue for Entertainment
    Utilities: "#FFCE56",     // Yellow for Utilities
    Others: "#4BC0C0",        // Green for Others
  };

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
        backgroundColor: categories.map((category, idx) => {
          const limit = budgetLimits[category];
          const spent = amountsByCategory[idx];

          if (limit > 0) {
            if (spent >= limit) {
              return "#FF0000"; // Red for exceeded
            } else if (spent >= limit * 0.9) {
              return "#FFA500"; // Orange for nearing limit
            }
          }
          return categoryColors[category]; // Default color based on category
        }),
      },
    ],
  };

  return (
    <div>
      <h3>Expense Summary</h3>
      <Pie data={data} />
      {categories.map((category, idx) => (
        <div key={category}>
          <p>
            <strong>{category}</strong>: ${amountsByCategory[idx]} / $
            {budgetLimits[category] || "No Limit"}
          </p>
          {alerts[category] && (
            <p style={{ color: "red" }}>{alerts[category]}</p>
          )}
        </div>
      ))}
    </div>
  );
}
