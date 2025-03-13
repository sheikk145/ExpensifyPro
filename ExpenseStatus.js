import React, { useEffect, useState } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip,Button,Box } from "@mui/material";
import { io } from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";




const ExpenseStatus = () => {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate(); 
  

  // Fetch submitted expenses
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/expenses"); // Adjust backend URL
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  // WebSocket connection for real-time updates
  useEffect(() => {
    const socket = io("http://localhost:5000"); // Backend WebSocket server

    socket.on("expenseUpdate", (updatedExpense) => {
      setExpenses((prevExpenses) =>
        prevExpenses.map((exp) => (exp.id === updatedExpense.id ? updatedExpense : exp))
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
        <Button variant="contained" color="secondary" onClick={() => navigate("/submit-expense")}>
          Back
        </Button>
      </Box>
      <Typography variant="h4" align="center" gutterBottom>
        Expense Status Tracking
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Employee ID</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Amount</strong></TableCell>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Rejection Reason</strong></TableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{expense.id}</TableCell>
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
                <TableCell>{expense.status === "Rejected" ? expense.rejectionReason : "N/A"}</TableCell>
                <TableCell>{expense.estimatedApprovalTime || "Processing..."}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ExpenseStatus;

