import React, { useState } from "react";

export default function SetBudgetLimits({ setBudgetLimit }) {
  const [limits, setLimits] = useState({
    Food: 0,
    Entertainment: 0,
    Utilities: 0,
    Others: 0,
  });

  const handleLimitChange = (category, value) => {
    setLimits({
      ...limits,
      [category]: Number(value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBudgetLimit(limits); 
  };

  return (
    <div>
      <h3>Set Budget Limits</h3>
      <form onSubmit={handleSubmit}>
        {Object.keys(limits).map((category) => (
          <div key={category} className="form-control">
            <label>{category}</label>
            <input
              type="number"
              value={limits[category]}
              onChange={(e) => handleLimitChange(category, e.target.value)}
            />
          </div>
        ))}
        <button className="btn">Set Limits</button>
      </form>
    </div>
  );
}
