import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SubmitExpense = () => {
  const [expense, setExpense] = useState({
    employeeid: "",
    amount: "",
    category: "",
    description: "",
    date: "",
    invoice: null,
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const categories = ["Travel", "Food", "Office Supplies", "Others"];

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setError("Only PDF files are allowed.");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setError("File size must be less than 2MB.");
        return;
      }
      setError("");
      setExpense({ ...expense, invoice: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!expense.employeeid || !expense.amount || !expense.category || !expense.date || !expense.invoice) {
      setError("All fields are required.");
      return;
    }

    const formData = new FormData();
    Object.keys(expense).forEach((key) => {
      formData.append(key, expense[key]);
    });

    try {
      await axios.post("http://localhost:5000/api/expenses", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/dashboard");
    } catch (error) {
      setError("Error submitting expense. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #e0c3fc, #8ec5fc)",
        minHeight: "100vh",
        py: 6,
      }}
    >
      <Container maxWidth="sm">
        {/* Navigation Buttons */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Button variant="contained" color="secondary" onClick={() => navigate("/dashboard")}>
            ⬅ Back
          </Button>
          <Button variant="contained" color="primary" onClick={() => navigate("/expense-status")}>
            Next ➡
          </Button>
        </Box>

        {/* Expense Form */}
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 4,
            background: "white",
            boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            fontWeight={500}
            sx={{
              mb: 3,
              background: "linear-gradient(45deg, #2196f3, #21cbf3)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ✏️ Submit Expense
          </Typography>

          {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Employee ID"
              name="employeeid"
              required
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Amount"
              name="amount"
              type="number"
              required
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              select
              label="Category"
              name="category"
              required
              onChange={handleChange}
              margin="normal"
            >
              {categories.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Description"
              name="description"
              multiline
              rows={3}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Date"
              name="date"
              type="date"
              InputLabelProps={{ shrink: true }}
              required
              onChange={handleChange}
              margin="normal"
            />

            <Box mt={2} mb={2}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Upload Invoice (PDF only)
              </Typography>
              <Button variant="outlined" component="label">
                Upload PDF
                <input
                  type="file"
                  accept=".pdf"
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
              {expense.invoice && (
                <Typography variant="body2" mt={1}>
                  📎 {expense.invoice.name}
                </Typography>
              )}
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 2,
                py: 1.2,
                fontWeight: "bold",
                letterSpacing: 0.5,
              }}
            >
              🚀 Submit Expense
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default SubmitExpense;
