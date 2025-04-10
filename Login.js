import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Paper,
  InputAdornment
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

const Login = () => {
  const navigate = useNavigate();

  const [managerData, setManagerData] = useState({ email: "", password: "" });
  const [employeeData, setEmployeeData] = useState({ email: "", password: "" });

  const handleChange = (e, role) => {
    const { name, value } = e.target;
    if (role === "manager") {
      setManagerData({ ...managerData, [name]: value });
    } else {
      setEmployeeData({ ...employeeData, [name]: value });
    }
  };

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
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #74ebd5, #ACB6E5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 6
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h3" align="center" gutterBottom fontWeight="bold">
          Welcome Back!
        </Typography>
        <Grid container spacing={4}>
          {/* Manager Login */}
          <Grid item xs={12} md={6}>
            <Paper elevation={6} sx={{ p: 4, borderRadius: 4, background: "#ffffffdd" }}>
              <Typography variant="h5" align="center" gutterBottom fontWeight={600}>
                Manager Login
              </Typography>
              <form onSubmit={(e) => handleSubmit(e, "manager")}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  margin="normal"
                  variant="outlined"
                  required
                  onChange={(e) => handleChange(e, "manager")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  required
                  onChange={(e) => handleChange(e, "manager")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    )
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    py: 1.5,
                    background: "#2196F3",
                    fontWeight: "bold",
                    fontSize: "16px",
                    borderRadius: "30px",
                    ":hover": {
                      backgroundColor: "#1976D2"
                    }
                  }}
                >
                  Login as Manager
                </Button>
              </form>
            </Paper>
          </Grid>

          {/* Employee Login */}
          <Grid item xs={12} md={6}>
            <Paper elevation={6} sx={{ p: 4, borderRadius: 4, background: "#ffffffdd" }}>
              <Typography variant="h5" align="center" gutterBottom fontWeight={600}>
                Employee Login
              </Typography>
              <form onSubmit={(e) => handleSubmit(e, "employee")}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  margin="normal"
                  variant="outlined"
                  required
                  onChange={(e) => handleChange(e, "employee")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  required
                  onChange={(e) => handleChange(e, "employee")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    )
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    py: 1.5,
                    background: "#4CAF50",
                    fontWeight: "bold",
                    fontSize: "16px",
                    borderRadius: "30px",
                    ":hover": {
                      backgroundColor: "#388E3C"
                    }
                  }}
                >
                  Login as Employee
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>

        <Typography align="center" sx={{ mt: 4, color: "#333" }}>
          Don’t have an account?{" "}
          <a href="/signup" style={{ textDecoration: "none", color: "#1976D2", fontWeight: 500 }}>
            Sign up here
          </a>
        </Typography>
      </Container>
    </Box>
  );
};

export default Login;
