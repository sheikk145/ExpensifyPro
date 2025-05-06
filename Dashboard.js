import React from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Chip,
  Box,
  Stack,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import {
  MonetizationOn,
  CalendarMonth,
  AddCircle,
  Hotel,
  FlightTakeoff,
  Restaurant,
} from "@mui/icons-material";

const expenseData = [
  { name: "Travel", value: 500 },
  { name: "Food", value: 300 },
  { name: "Office Supplies", value: 200 },
  { name: "Others", value: 150 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        background: "linear-gradient(to right, rgb(252, 195, 235), #8ec5fc)",
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Header with Logout */}
        <Box
          sx={{
            background: "linear-gradient(90deg, #4facfe, #00f2fe)",
            p: 4,
            borderRadius: 3,
            color: "#fff",
            mb: 6,
            boxShadow: 3,
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
            }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                // Handle actual logout logic here if needed
                navigate("/login");
              }}
            >
              Logout
            </Button>
          </Box>

          <Typography variant="h3" fontWeight={400} textAlign="center">
            🚀 Employee Dashboard
          </Typography>
          <Typography variant="subtitle1" textAlign="center">
            Manage and track expenses effortlessly
          </Typography>
        </Box>

        {/* Stat Cards */}
        <Grid container spacing={4} justifyContent="center">
          {[
            {
              icon: <MonetizationOn sx={{ fontSize: 60 }} />,
              title: "Monthly Expenses",
              value: "₹15,000",
              bg: "linear-gradient(to right, #2193b0, #6dd5ed)",
            },
            {
              icon: <CalendarMonth sx={{ fontSize: 60 }} />,
              title: "Yearly Expenses",
              value: "₹1,80,000",
              bg: "linear-gradient(to right, #fc4a1a, #f7b733)",
            },
            {
              icon: <AddCircle sx={{ fontSize: 60 }} />,
              title: "Want to Add an Expense?",
              button: true,
              bg: "linear-gradient(to right, #43cea2, #185a9d)",
            },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                sx={{
                  p: 5,
                  height: 250,
                  textAlign: "center",
                  borderRadius: 4,
                  background: item.bg,
                  color: "#fff",
                  boxShadow: 4,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: 8,
                  },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {item.icon}
                <Typography variant="h6" mt={2}>
                  {item.title}
                </Typography>
                {item.button ? (
                  <Button
                    variant="contained"
                    color="inherit"
                    sx={{ mt: 2 }}
                    onClick={() => navigate("/submit-expense")}
                  >
                    Submit Expense
                  </Button>
                ) : (
                  <Typography variant="h4" mt={1}>
                    {item.value}
                  </Typography>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Second Row */}
        <Grid container spacing={4} sx={{ mt: 4 }} justifyContent="center">
          {/* Recent Expenses */}
          <Grid item xs={12} md={5}>
            <Paper
              sx={{
                p: 4,
                borderRadius: 4,
                boxShadow: 4,
                height: 400,
                backgroundColor: "#f5faff",
                border: "2px solid #b2ebf2",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: 8,
                },
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#81d4fa",
                  p: 1.5,
                  borderRadius: 2,
                  mb: 3,
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" color="#004d40">
                  🕒 Recent Expenses
                </Typography>
              </Box>

              <Stack spacing={3}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: "#e1f5fe",
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <Hotel color="primary" />
                    <Typography>Hotel Booking - ₹5,000</Typography>
                  </Box>
                  <Chip label="Pending" color="warning" size="small" />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: "#e0f7fa",
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <FlightTakeoff color="success" />
                    <Typography>Flight Tickets - ₹7,000</Typography>
                  </Box>
                  <Chip label="Approved" color="success" size="small" />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: "#ffebee",
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <Restaurant color="error" />
                    <Typography>Office Lunch - ₹3,000</Typography>
                  </Box>
                  <Chip label="Rejected" color="error" size="small" />
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* Pie Chart */}
          <Grid item xs={12} md={7}>
            <Paper
              sx={{
                p: 4,
                height: 400,
                borderRadius: 4,
                boxShadow: 4,
                backgroundColor: "#fff8e1",
                border: "2px solid #ffecb3",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: 8,
                },
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#ffd54f",
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  mb: 2,
                }}
              >
                <Typography variant="h6" color="#4e342e">
                  📊 Expense Breakdown
                </Typography>
              </Box>

              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={expenseData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {expenseData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              <Box mt={2} display="flex" justifyContent="center" flexWrap="wrap" gap={2}>
                {expenseData.map((entry, index) => (
                  <Box key={index} display="flex" alignItems="center" gap={1}>
                    <Box
                      sx={{
                        width: 14,
                        height: 14,
                        backgroundColor: COLORS[index % COLORS.length],
                        borderRadius: "50%",
                      }}
                    />
                    <Typography variant="body2">{entry.name}</Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
