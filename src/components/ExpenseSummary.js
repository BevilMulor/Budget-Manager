import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpenseSummary({ transactions, budgetLimits }) {
  if (!transactions || !budgetLimits) {
    return <p>Loading expense summary...</p>; 
  }

  const categories = ["Food", "Entertainment", "Utilities", "Others"];

  const categoryColors = {
    Food: '#800080',          
    Entertainment: "#36A2EB", 
    Utilities: "#FFCE56",    
    Others: "#4BC0C0",       
  };

  const amountsByCategory = categories.map((category) =>
    Math.abs(
      transactions
        .filter((t) => t.category === category)
        .reduce((acc, curr) => acc + Number(curr.amount), 0)
    )
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
              return "#FF0000"; 
            } else if (spent >= limit * 0.9) {
              return "#FFA500"; 
            }
          }
          return categoryColors[category]; 
        }),
      },
    ],
  };

  //Get the alert message based on spending vs budget
  const getAlertMessage = (category, spent, limit) => {
    if (!limit || limit <= 0) return null;
  
    if (spent > limit) {
      return `You have exceeded the budget for ${category}.`;
    } else if (spent >= limit * 0.9) {
      return `Warning: You are nearing the budget limit for ${category}.`;
    }
  
    return null; 
  };
  
  return (
    <div>
      <h3>Expense Summary</h3>
      <div className="pie-chart-container">
        <Pie data={data} />
      </div>

      {categories.map((category, idx) => {
        const spent = amountsByCategory[idx];
        const limit = budgetLimits[category];
        const alertMessage = getAlertMessage(category, spent, limit);

        return (
          <div key={category}>
            <p>
              <strong>{category}</strong>: ${spent.toFixed(2)} / ${limit || "No Limit"}
            </p>
            {alertMessage && (
              <p style={{ color: "red", fontWeight: "bold" }}>
                {alertMessage}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
