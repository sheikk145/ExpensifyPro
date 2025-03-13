import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  // Separate form states for Manager and Employee
  const [managerData, setManagerData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e, role) => {
    if (role === "manager") {
      setManagerData({ ...managerData, [e.target.name]: e.target.value });
    } else {
      setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e, role) => {
    e.preventDefault();
    const formData = role === "manager" ? managerData : employeeData;
    const endpoint = role === "manager" ? "http://localhost:5000/api/signup/manager" : "http://localhost:5000/api/signup/employee";

    try {
      const response = await axios.post(endpoint, formData);
      console.log(`${role} Signup Successful:`, response.data);
      navigate("/login");
    } catch (error) {
      console.error(`${role} Signup Error:`, error.response?.data || error.message);
    }
  };

  return (
    <Container maxWidth="md"> {/* Increased width for side-by-side layout */}
      <Typography variant="h4" align="center" gutterBottom>
        Signup
      </Typography>
      <Grid container spacing={4}>
        {/* Manager Signup */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Manager Signup
            </Typography>
            <form onSubmit={(e) => handleSubmit(e, "manager")}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                variant="outlined"
                margin="normal"
                required
                onChange={(e) => handleChange(e, "manager")}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                margin="normal"
                required
                onChange={(e) => handleChange(e, "manager")}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                margin="normal"
                required
                onChange={(e) => handleChange(e, "manager")}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Sign Up
              </Button>
            </form>
          </Box>
        </Grid>

        {/* Employee Signup */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Employee Signup
            </Typography>
            <form onSubmit={(e) => handleSubmit(e, "employee")}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                variant="outlined"
                margin="normal"
                required
                onChange={(e) => handleChange(e, "employee")}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                margin="normal"
                required
                onChange={(e) => handleChange(e, "employee")}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                margin="normal"
                required
                onChange={(e) => handleChange(e, "employee")}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Sign Up
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Already have an account? <a href="/login">Login</a>
      </Typography>
    </Container>
  );
};

export default Signup;
