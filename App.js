import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Dashboard from "./components/Dashboard";
import ExpenseStatus from "./components/ExpenseStatus";
import ManagerExpense from "./components/ManagerExpense";
import SubmitExpense from "./components/SubmitExpense";

import "./App.css"; // Keep this for styling

function App() {
  return (
    <Router>
      <div className="App">
        {/* Logo and Title Wrapper */}
        <div className="header">
          <img src="/images/expensifypro-logo.png" alt="ExpensifyPro Logo" className="logo" />
          <h1>ExpensifyPro</h1>
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/expense-status" element={<ExpenseStatus />} />
          <Route path="/manager-expenses" element={<ManagerExpense />} />
          <Route path="/submit-expense" element={<SubmitExpense />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
