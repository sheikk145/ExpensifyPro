import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, MenuItem } from "@mui/material";
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

  // Categories
  const categories = ["Travel", "Food", "Office Supplies", "Others"];

  // Handle input changes
  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  // Handle file upload
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!expense.employeeid || !expense.amount || !expense.category || !expense.date || !expense.invoice) {
      setError("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("employeeid", expense.employeeid);
    formData.append("amount", expense.amount);
    formData.append("category", expense.category);
    formData.append("description", expense.description);
    formData.append("date", expense.date);
    formData.append("invoice", expense.invoice);

    try {
      await axios.post("http://localhost:5000/api/expenses", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Expense Submitted!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting expense:", error);
      setError("Error submitting expense. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      {/* Navigation Buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
        <Button variant="contained" color="secondary" onClick={() => navigate("/dashboard")}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={() => navigate("/expense-status")}>
          Next
        </Button>
      </Box>

      <Box sx={{ mt: 3, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Submit Expense
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Employee ID" name="employeeid" required onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Amount" name="amount" type="number" required onChange={handleChange} margin="normal" />
          <TextField fullWidth select label="Category" name="category" required onChange={handleChange} margin="normal">
            {categories.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField fullWidth label="Description" name="description" multiline rows={3} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Date" name="date" type="date" InputLabelProps={{ shrink: true }} required onChange={handleChange} margin="normal" />
          <input type="file" accept=".pdf" onChange={handleFileChange} style={{ marginTop: "15px" }} />

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SubmitExpense;
