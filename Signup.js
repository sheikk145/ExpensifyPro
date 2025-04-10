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
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

const Signup = () => {
  const navigate = useNavigate();

  const [managerData, setManagerData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    password: ""
  });

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
        ? "http://localhost:5000/api/signup/manager"
        : "http://localhost:5000/api/signup/employee";

    try {
      const response = await axios.post(endpoint, formData);
      console.log(`${role} Signup Successful:`, response.data);
      navigate("/login");
    } catch (error) {
      console.error(`${role} Signup Error:`, error.response?.data || error.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #fbc2eb, #a6c1ee)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 6
      }}
    >
      <Container maxWidth="md">
        {/* Enhanced Header */}
        <Box textAlign="center" mb={5}>
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{
              background: "linear-gradient(to right, #7b2ff7, #f107a3)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" }
            }}
          >
            👥 Join the Team!
          </Typography>

          <Typography variant="h6" color="text.secondary" mt={1}>
            Create an account to get started as a Manager or Employee.
          </Typography>

          <Box
            sx={{
              width: 80,
              height: 4,
              backgroundColor: "#7b2ff7",
              mx: "auto",
              mt: 2,
              borderRadius: 2
            }}
          />
        </Box>

        <Grid container spacing={4}>
          {/* Manager Signup */}
          <Grid item xs={12} md={6}>
            <Paper elevation={6} sx={{ p: 4, borderRadius: 4, background: "#ffffffdd" }}>
              <Typography
                variant="h5"
                align="center"
                gutterBottom
                fontWeight={600}
              >
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
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    )
                  }}
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
                  variant="outlined"
                  margin="normal"
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
                  Sign Up as Manager
                </Button>
              </form>
            </Paper>
          </Grid>

          {/* Employee Signup */}
          <Grid item xs={12} md={6}>
            <Paper elevation={6} sx={{ p: 4, borderRadius: 4, background: "#ffffffdd" }}>
              <Typography
                variant="h5"
                align="center"
                gutterBottom
                fontWeight={600}
              >
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
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    )
                  }}
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
                  variant="outlined"
                  margin="normal"
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
                  Sign Up as Employee
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>

        <Typography align="center" sx={{ mt: 4, color: "#333" }}>
          Already have an account?{" "}
          <a
            href="/login"
            style={{
              textDecoration: "none",
              color: "#1976D2",
              fontWeight: 500
            }}
          >
            Login here
          </a>
        </Typography>
      </Container>
    </Box>
  );
};

export default Signup;
