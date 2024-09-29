import React, { Component } from "react";
import { connect } from "react-redux";
import Balance from "../components/Balance";
import AddTransactions from "../components/AddTransactions";
import TransactionsList from "../components/TransactionsList";
import IncomeExpense from "../components/IncomeExpense";
import ExpenseSummary from "../components/ExpenseSummary";
import SetBudgetLimits from "../components/SetBudgetLimits";
import { addTransaction, deleteTransaction } from "../redux/actions";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      budgetLimits: {
        Food: 0,
        Entertainment: 0,
        Utilities: 0,
        Others: 0,
      },
      alerts: {},
    };
  }

  setBudgetLimit = (limits) => {
    this.setState({ budgetLimits: limits }, this.checkForAlerts);
  };

  checkForAlerts = () => {
    const { transactions } = this.props;
    const { budgetLimits } = this.state;
    const alerts = {};

    // Calculate total spent per category
    const spending = {
      Food: 0,
      Entertainment: 0,
      Utilities: 0,
      Others: 0,
    };

    transactions.forEach((transaction) => {
      const category = transaction.category;
      const amount = Number(transaction.amount);
      if (spending[category] !== undefined) {
        spending[category] += amount;
      }
    });

    // Check if spending is nearing or exceeding limits
    Object.keys(budgetLimits).forEach((category) => {
      const limit = budgetLimits[category];
      const totalSpent = spending[category];

      if (limit > 0) {
        if (totalSpent >= limit) {
          alerts[category] = `Alert: You have exceeded your ${category} budget limit!`;
        } else if (totalSpent >= limit * 0.9) {
          alerts[category] = `Warning: You are nearing your ${category} budget limit!`;
        }
      }
    });

    this.setState({ alerts });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.transactions !== this.props.transactions) {
      this.checkForAlerts();
    }
  }

  render() {
    const { transactions, addTransaction, deleteTransaction } = this.props;
    const { budgetLimits, alerts } = this.state;

    return (
      <div className="container">
        <Balance transactions={transactions} />
        <IncomeExpense transactions={transactions} />
        <TransactionsList
          transactions={transactions}
          deleteTransaction={deleteTransaction}
        />
        <AddTransactions
          addTransaction={addTransaction}
          id={transactions[0] ? transactions[0].id + 1 : 1}
        />
        <SetBudgetLimits setBudgetLimit={this.setBudgetLimit} />
        <ExpenseSummary
          transactions={transactions}
          budgetLimits={budgetLimits}
          alerts={alerts}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  transactions: state.transactions,
});

const mapDispatchToProps = {
  addTransaction,
  deleteTransaction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
