import React, { useEffect, useState } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Chip, Select, MenuItem, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";

const ManagerExpense = () => {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  // Fetch all employees' expenses
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/manager/expenses");
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  // WebSocket connection for real-time updates
  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("expenseUpdate", (updatedExpense) => {
      setExpenses((prevExpenses) =>
        prevExpenses.map((exp) => (exp.id === updatedExpense.id ? updatedExpense : exp))
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Handle approval/rejection
  const handleAction = async (id, status) => {
    try {
     // const response = await axios.put(`http://localhost:5000/api/manager/expenses/${id}`, { status });

      setExpenses((prevExpenses) =>
        prevExpenses.map((exp) => (exp.id === id ? { ...exp, status } : exp))
      );
    } catch (error) {
      console.error(`Error updating expense (${status}):`, error);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    // Clear authentication data (if stored in localStorage)
    localStorage.removeItem("authToken"); // Optional: If you use auth tokens
    navigate("/signup"); // Redirect to signup page
  };

  // Filter Expenses
  const filteredExpenses = expenses.filter(
    (expense) => filter === "All" || expense.status === filter
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" align="center">
          Manager Expense Overview
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      {/* Filter Dropdown */}
      <Select value={filter} onChange={(e) => setFilter(e.target.value)} sx={{ mb: 2 }}>
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="Approved">Approved</MenuItem>
        <MenuItem value="Rejected">Rejected</MenuItem>
      </Select>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Employee ID</strong></TableCell>
              <TableCell><strong>Amount</strong></TableCell>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Invoice</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredExpenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{expense.employeeName}</TableCell>
                <TableCell>₹{expense.amount}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>
                  <Chip
                    label={expense.status}
                    color={
                      expense.status === "Approved"
                        ? "success"
                        : expense.status === "Rejected"
                        ? "error"
                        : "warning"
                    }
                  />
                </TableCell>
                <TableCell>
                  <a href={expense.invoiceUrl} target="_blank" rel="noopener noreferrer">
                    View Invoice
                  </a>
                </TableCell>
                <TableCell>
                  {expense.status === "Pending" && (
                    <>
                      <Button variant="contained" color="success" sx={{ mr: 1 }} onClick={() => handleAction(expense.id, "Approved")}>
                        Approve
                      </Button>
                      <Button variant="contained" color="error" onClick={() => handleAction(expense.id, "Rejected")}>
                        Reject
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ManagerExpense;
