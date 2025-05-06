import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Paper,
  InputAdornment
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: "manager",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
    phone: "",
    address: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const endpoint =
      formData.role === "manager"
        ? "http://localhost:5000/api/signup/manager"
        : "http://localhost:5000/api/signup/employee";

    try {
      const { confirmPassword, ...submitData } = formData;
      const response = await axios.post(endpoint, submitData);
      console.log("Signup Successful:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #fbc2eb, #a6c1ee)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 6
      }}
    >
      {/* 💡 JOIN THE TEAM TEXT OUTSIDE THE FORM */}
      <Typography
        variant="h4"
        fontWeight="bold"
        align="center"
        sx={{
          mb: 3,
          fontSize: "28px",
          fontStyle: "italic",
          letterSpacing: "2px",
          textShadow: "2px 2px 6px rgba(0,0,0,0.3)",
          background: "linear-gradient(to right, #7b2ff7, #f107a3)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}
      >
        🚀 Join the Team
      </Typography>

      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ p: 4, borderRadius: 4, background: "#ffffffdd" }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            align="center"
            gutterBottom
            sx={{
              background: "linear-gradient(to right, #7b2ff7, #f107a3)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Sign Up
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              select
              fullWidth
              label="Select Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              margin="normal"
              required
            >
              <MenuItem value="manager">Manager</MenuItem>
              <MenuItem value="employee">Employee</MenuItem>
            </TextField>

            <TextField
              fullWidth
              label="Full Name"
              name="name"
              onChange={handleChange}
              margin="normal"
              required
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
              onChange={handleChange}
              margin="normal"
              required
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
              onChange={handleChange}
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                )
              }}
            />

            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              onChange={handleChange}
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                )
              }}
            />

            <TextField
              fullWidth
              label="Date of Birth"
              name="dob"
              type="date"
              onChange={handleChange}
              margin="normal"
              required
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EventIcon />
                  </InputAdornment>
                )
              }}
            />

            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              type="tel"
              onChange={handleChange}
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                )
              }}
            />

            <TextField
              fullWidth
              label="Address"
              name="address"
              multiline
              rows={2}
              onChange={handleChange}
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HomeIcon />
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
                fontWeight: "bold",
                borderRadius: "30px",
                background: "#7b2ff7",
                ":hover": { backgroundColor: "#5e1dd8" }
              }}
            >
              Sign Up
            </Button>
          </form>

          <Typography align="center" sx={{ mt: 3 }}>
            Already have an account?{" "}
            <a href="/login" style={{ color: "#1976D2", textDecoration: "none" }}>
              Login here
            </a>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Signup;
