Personal Budget Manager

This is a React-based web application for managing personal budgets, expenses, and viewing financial data visually using charts.

Project Overview

The Personal Budget Manager helps users keep track of their expenses by setting budgets, tracking spending by categories, and generating charts for easy visualization.

Features

Add and categorize expenses.
Set budget limits for categories (Food, Entertainment, Utilities, and others.).
Visualize spending with pie charts.
Alerts for approaching budget limits.
Persistent state using Redux and Redux Persist.

Live Demo

Check out the live demo here

Technologies Used

React: For building the user interface.

Redux: For state management.

Redux Persist: To persist the Redux store across sessions.

Chart.js: For visualizing data.

React Chart.js 2: Wrapper for Chart.js in React.

Installation

To run this project locally, follow these steps:
Clone the repository:
git clone https://github.com/BevilMulor/Personal-Budget-Manager.git
cd Personal-Budget-Manager

Install dependencies: 

This project uses Yarn as a package manager. Run the following command to install the required packages:
yarn install


Start the development server:

yarn start
This will start the application locally on http://localhost:3000.


Available Scripts

In the project directory, you can run the following scripts:
yarn start: Starts the development server.
yarn build: Builds the app for production.
yarn test: Runs the tests.
yarn eject: Ejects the configuration (for advanced users).
yarn deploy: Deploys the app to GitHub Pages.




Deployment

To deploy the project on GitHub Pages, follow these steps:
1. Ensure you have set the homepage field in package.json to https://BevilMulor.github.io/Personal-Budget-Manager.
Run the following command to build and deploy the app:
yarn deploy
2. This will automatically build the project and push the production build to the gh-pages branch, which GitHub Pages uses to serve the live demo.





Contributing

Contributions are welcome! Please submit a pull request or create an issue if you have any suggestions or bugs to report.

