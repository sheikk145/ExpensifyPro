import React from "react";
import { Typography, Button, Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";

// Import 3D images
const images = [
  { src: "/images/travel.png", alt: "Travel", id: 1 },
  { src: "/images/food.png", alt: "Food", id: 2 },
  { src: "/images/company.png", alt: "Company Infrastructure", id: 3 },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        flexDirection: "column",
        position: "relative",
        background: "linear-gradient(135deg, rgba(33, 150, 243, 0.8), rgba(30, 136, 229, 0.8))",
        overflow: "hidden",
      }}
      >
      {/* Background Wave Animation */}
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: -20 }}
        transition={{ repeat: Infinity, repeatType: "mirror", duration: 2, ease: "easeInOut" }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "200px",
          background: "url('/images/wave.svg')",
          backgroundRepeat: "repeat-x",
          backgroundSize: "cover",
          opacity: 0.3, // Keep it subtle
        }}
      />
    
      {/* Logo as Background */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "url('/images/expensifypro-logo.png') no-repeat center",
          backgroundSize: "cover",
          opacity: 0.1, // Makes it slightly transparent
          zIndex: 0, // Behind everything
        }}
      />

      {/* Animated 3D Images */}
      <Box
        sx={{
          position: "absolute",
          top: "4%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          zIndex: 1, // Ensures these appear above the background
        }}
      >
        {images.map((image) => (
          <motion.img
            key={image.id}
            src={image.src}
            alt={image.alt}
            style={{ width: "300px", height: "300px", borderRadius: "20px" }}
            initial={{ scale: 1, opacity: 0.8 }}
            whileHover={{ scale: 1.1, opacity: 1, rotate: 5 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        ))}
      </Box>

      {/* Website Name & Get Started Button */}
      <Box sx={{ position: "relative", zIndex: 10, mt: "170px" }}>
        <Typography variant="h2" fontWeight="bold" color="white">
          ExpensifyPro
        </Typography>
        <Typography variant="h6" sx={{ mt: 0.5, color: "black", maxWidth: "600px" }}>
          Smart, seamless, and secure expense tracking for your business.
        </Typography>

        <Button
          variant="contained"
          sx={{
            mt: 1,
            px: 4,
            py: 1,
            fontSize: "1.2rem",
            backgroundColor: "#FF9800",
            "&:hover": { backgroundColor: "#FB8C00" },
          }}
          onClick={() => navigate("/signup")}
        >
          Get Started
        </Button>
      </Box>

      {/* Footer - About Us & Social Media */}
      <Box
        sx={{
          position: "absolute",
          bottom: "80px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          px: "40px",
          zIndex: 2,
        }}
      >
        <Typography variant="body2" color="white">
          &copy; 2024 ExpensifyPro. <br /> A seamless solution for enterprise expense management.
        </Typography>

        <Box>
          <IconButton
            component="a"
            href="https://www.linkedin.com/in/sheik-noor-mohamed-a5a8a924a"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "white", "&:hover": { color: "#0e76a8" } }}
          >
            <LinkedInIcon fontSize="large" />
          </IconButton>

          <IconButton
            component="a"
            href="https://twitter.com/YOUR-TWITTER-USERNAME"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "white", "&:hover": { color: "#1DA1F2" } }}
          >
            <TwitterIcon fontSize="large" />
          </IconButton>

          <IconButton
            component="a"
            href="https://github.com/sheikk145"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "white", "&:hover": { color: "#333" } }}
          >
            <GitHubIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
