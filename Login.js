import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  // Separate form states for Manager and Employee
  const [managerData, setManagerData] = useState({ email: "", password: "" });
  const [employeeData, setEmployeeData] = useState({ email: "", password: "" });

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
    const endpoint =
      role === "manager"
        ? "http://localhost:5000/api/login/manager"
        : "http://localhost:5000/api/login/employee";

    try {
      const response = await axios.post(endpoint, formData);
      console.log(`${role} Login Successful:`, response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error(`${role} Login Error:`, error.response?.data || error.message);
    }
  };

  return (
    <Container maxWidth="md"> {/* Increased width for side-by-side layout */}
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <Grid container spacing={4}>
        {/* Manager Login */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Manager Login
            </Typography>
            <form onSubmit={(e) => handleSubmit(e, "manager")}>
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
                Login
              </Button>
            </form>
          </Box>
        </Grid>

        {/* Employee Login */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Employee Login
            </Typography>
            <form onSubmit={(e) => handleSubmit(e, "employee")}>
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
                Login
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Don't have an account? <a href="/signup">Sign up</a>
      </Typography>
    </Container>
  );
};

export default Login;
