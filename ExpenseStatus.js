import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TextField,
  Box,
  Stack,
  Fade,
  IconButton,
  Pagination,
  CircularProgress,
  useTheme,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Switch,
  Tooltip
} from "@mui/material";
import { io } from "socket.io-client";
import axios from "axios";
import DownloadIcon from "@mui/icons-material/Download";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const ExpenseStatus = () => {
  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [darkMode, setDarkMode] = useState(false);

  const rowsPerPage = 5;

  const lightTheme = createTheme({ palette: { mode: "light" } });
  const darkTheme = createTheme({ palette: { mode: "dark" } });

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/expenses");
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    fetchExpenses();
  }, []);

  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.on("expenseUpdate", (updatedExpense) => {
      setExpenses((prev) =>
        prev.map((exp) => (exp.id === updatedExpense.id ? updatedExpense : exp))
      );
    });
    return () => socket.disconnect();
  }, []);

  const statusColors = {
    Approved: "success",
    Rejected: "error",
    Pending: "warning",
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchCategory = expense.category.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || expense.status === filterStatus;
    return matchCategory && matchStatus;
  });

  const paginatedExpenses = filteredExpenses.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const exportToCSV = () => {
    const csvContent = [
      ["ID", "Amount", "Category", "Status", "Rejection Reason", "Approval Time"],
      ...filteredExpenses.map((e) => [
        e.id,
        e.amount,
        e.category,
        e.status,
        e.rejectionReason || "N/A",
        e.estimatedApprovalTime || "Processing...",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "expenses.csv";
    link.click();
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          background: darkMode
            ? "linear-gradient(to right, #212121, #424242)"
            : "linear-gradient(to right, #e3f2fd, #fce4ec)",
          py: 6,
          px: 2,
        }}
      >
        <Container maxWidth="lg">
          <Fade in timeout={800}>
            <Box>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  📊 Expense Status Tracking
                </Typography>

                <Stack direction="row" spacing={1} alignItems="center">
                  <Tooltip title="Export as CSV">
                    <IconButton color="primary" onClick={exportToCSV}>
                      <DownloadIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Toggle Light/Dark Mode">
                    <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
                      {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Box>

              <Box display="flex" justifyContent="space-between" my={3} flexWrap="wrap" gap={2}>
                <TextField
                  label="Search by Category"
                  variant="outlined"
                  onChange={(e) => setSearch(e.target.value)}
                  sx={{ flex: 1, minWidth: 220 }}
                />
                <Stack direction="row" spacing={1}>
                  {["All", "Pending", "Approved", "Rejected"].map((status) => (
                    <Chip
                      key={status}
                      label={status}
                      color={filterStatus === status ? "primary" : "default"}
                      onClick={() => setFilterStatus(status)}
                      variant={filterStatus === status ? "filled" : "outlined"}
                      sx={{ cursor: "pointer", fontWeight: "bold" }}
                    />
                  ))}
                </Stack>
              </Box>

              <TableContainer
                component={Paper}
                sx={{
                  borderRadius: 4,
                  boxShadow: 3,
                  background: darkMode ? "#263238" : "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: darkMode ? "#37474f" : "#2196f3" }}>
                      {[
                        "Expense ID",
                        "Amount",
                        "Category",
                        "Status",
                        "Rejection Reason",
                        "Estimated Approval Time",
                      ].map((head) => (
                        <TableCell
                          key={head}
                          sx={{ color: "#fff", fontWeight: "bold", fontSize: "1rem" }}
                        >
                          {head}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedExpenses.map((expense) => (
                      <TableRow
                        key={expense.id}
                        hover
                        sx={{
                          transition: "all 0.3s",
                          "&:hover": {
                            backgroundColor: darkMode ? "#424242" : "#f1faff",
                          },
                        }}
                      >
                        <TableCell>{expense.id}</TableCell>
                        <TableCell>₹{expense.amount}</TableCell>
                        <TableCell>{expense.category}</TableCell>
                        <TableCell>
                          {expense.status === "Pending" ? (
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <CircularProgress size={16} thickness={6} color="warning" />
                              <Typography variant="body2">Pending</Typography>
                            </Stack>
                          ) : (
                            <Chip
                              label={expense.status}
                              color={statusColors[expense.status]}
                              sx={{ fontWeight: "bold" }}
                            />
                          )}
                        </TableCell>
                        <TableCell>
                          {expense.status === "Rejected" ? expense.rejectionReason : "N/A"}
                        </TableCell>
                        <TableCell>{expense.estimatedApprovalTime || "Processing..."}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Pagination */}
              <Box mt={3} display="flex" justifyContent="center">
                <Pagination
                  count={Math.ceil(filteredExpenses.length / rowsPerPage)}
                  page={page}
                  onChange={(e, value) => setPage(value)}
                  color="primary"
                />
              </Box>
            </Box>
          </Fade>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default ExpenseStatus;
