import React from "react";
import { Container, Typography, Grid, Paper, Button, Box } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";

// Dummy Data for Expenses
const expenseData = [
  { name: "Travel", value: 500 },
  { name: "Food", value: 300 },
  { name: "Office Supplies", value: 200 },
  { name: "Others", value: 150 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // If using auth tokens
    navigate("/signup"); // Redirect to Signup Page
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      {/* Top Section with Title and Logout Button */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4">Employee Dashboard</Typography>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      {/* Stats Section */}
      <Grid container spacing={3}>
        {/* Monthly Expenses */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6">Total Expenses (This Month)</Typography>
            <Typography variant="h4" color="primary">₹15,000</Typography>
          </Paper>
        </Grid>

        {/* Yearly Expenses */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6">Total Expenses (This Year)</Typography>
            <Typography variant="h4" color="secondary">₹1,80,000</Typography>
          </Paper>
        </Grid>

        {/* Submit Expense Button */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6">Want to Add an Expense?</Typography>
            <Button variant="contained" color="primary" onClick={() => navigate("/submit-expense")}>
              Submit Expense
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Expenses & Expense Trends */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* Recent Expenses */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Recent Expenses</Typography>
            <ul>
              <li>Hotel Booking - ₹5,000 (Pending)</li>
              <li>Flight Tickets - ₹7,000 (Approved)</li>
              <li>Office Lunch - ₹3,000 (Rejected)</li>
            </ul>
          </Paper>
        </Grid>

        {/* Expense Pie Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: 300 }}>
            <Typography variant="h6" align="center">Expense Breakdown</Typography>
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie data={expenseData} dataKey="value" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
