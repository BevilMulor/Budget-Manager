import React, { useState } from "react";
import Transaction from "./Transaction";

export default function TransactionsList({ transactions, deleteTransaction }) {
  const [filterCategory, setFilterCategory] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const filteredTransactions = transactions
    .filter((transaction) =>
      filterCategory ? transaction.category === filterCategory : true
    )
    .filter((transaction) =>
      filterDate ? transaction.date === filterDate : true
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <h3>Transactions</h3>
      <div>
        <label>Filter by Category:</label>
        <select onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="">All</option>
          <option value="Food">Food</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Utilities">Utilities</option>
          <option value="Others">Others</option>
        </select>
        <label>Filter by Date:</label>
        <input type="date" onChange={(e) => setFilterDate(e.target.value)} />
      </div>
      <ul className="list">
        {filteredTransactions.map((transaction) => (
          <Transaction
            key={transaction.id}
            transaction={transaction}
            deleteTransaction={deleteTransaction}
          />
        ))}
      </ul>
    </div>
  );
}
