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
  Button,
  Chip,
  Select,
  MenuItem,
  Box,
  IconButton,
  Tooltip,
  Switch,
  TextField,
  TablePagination,
  CssBaseline,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import {
  Logout,
  CheckCircle,
  Cancel,
  LightMode,
  DarkMode,
  Receipt,
  Search,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import { motion } from "framer-motion";

const darkTheme = createTheme({ palette: { mode: "dark" } });
const lightTheme = createTheme({ palette: { mode: "light" } });

const ManagerExpense = () => {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/manager/expenses");
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

  const handleAction = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/manager/expenses/${id}`, { status });
      setExpenses((prev) =>
        prev.map((exp) => (exp.id === id ? { ...exp, status } : exp))
      );
    } catch (error) {
      console.error(`Error updating expense (${status}):`, error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/signup");
  };

  const filteredExpenses = expenses
    .filter((expense) => filter === "All" || expense.status === filter)
    .filter((expense) =>
      expense.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const paginatedExpenses = filteredExpenses.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          background: darkMode
  ? "linear-gradient(to right, #16222a, #3a6073)"  // Sleek dark gradient
  :"linear-gradient(to right, #f5f7fa, #c3cfe2)",
          backgroundAttachment: "fixed",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          p: 3,
          pt: 6, // Adjust this value to control top spacing
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            borderRadius: 5,
            p: 4,
            background: darkMode
              ? "rgba(255, 255, 255, 0.03)"
              : "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 8px 32px rgba(31, 38, 135, 0.2)",
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{
                  background: "linear-gradient(to right, #30CFD0 0%, #330867 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Manager Expense Overview
              </Typography>
            </motion.div>

            <Box display="flex" alignItems="center" gap={2}>
              <Tooltip title="Toggle Theme">
                <Switch
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                  icon={<LightMode />}
                  checkedIcon={<DarkMode />}
                />
              </Tooltip>
              <Button
                variant="outlined"
                color="error"
                startIcon={<Logout />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
          </Box>

          {/* Filter & Search */}
          <Box display="flex" flexWrap="wrap" gap={2} mb={3} alignItems="center">
            <Select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Approved">Approved</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </Select>

            <TextField
              variant="outlined"
              placeholder="Search by Employee"
              size="small"
              InputProps={{ startAdornment: <Search sx={{ mr: 1 }} /> }}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Box>

          {/* Table */}
          <TableContainer
            component={Paper}
            elevation={6}
            sx={{
              borderRadius: 3,
              background: darkMode
                ? "rgba(255,255,255,0.04)"
                : "rgba(255,255,255,0.8)",
              backdropFilter: "blur(12px)",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  {["Employee", "Amount", "Category", "Status", "Invoice", "Actions"].map(
                    (header) => (
                      <TableCell key={header} sx={{ fontWeight: "bold" }}>
                        {header}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedExpenses.map((expense) => (
                  <motion.tr
                    key={expense.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <TableCell>{expense.employeeName}</TableCell>
                    <TableCell>₹{expense.amount}</TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell>
                      <Chip
                        icon={
                          expense.status === "Approved" ? (
                            <CheckCircle />
                          ) : expense.status === "Rejected" ? (
                            <Cancel />
                          ) : null
                        }
                        label={expense.status}
                        color={
                          expense.status === "Approved"
                            ? "success"
                            : expense.status === "Rejected"
                            ? "error"
                            : "warning"
                        }
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <a
                        href={expense.invoiceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none" }}
                      >
                        <Tooltip title="View Invoice">
                          <IconButton>
                            <Receipt />
                          </IconButton>
                        </Tooltip>
                      </a>
                    </TableCell>
                    <TableCell>
                      {expense.status === "Pending" && (
                        <>
                          <Button
                            variant="contained"
                            color="success"
                            size="small"
                            sx={{ mr: 1 }}
                            onClick={() => handleAction(expense.id, "Approved")}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => handleAction(expense.id, "Rejected")}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>

            <TablePagination
              component="div"
              count={filteredExpenses.length}
              page={page}
              onPageChange={(e, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
            />
          </TableContainer>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default ManagerExpense;
