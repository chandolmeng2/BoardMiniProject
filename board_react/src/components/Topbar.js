import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Box,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;

function Topbar({ onMenuClick }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AppBar
      position="fixed"
      elevation={scrolled ? 8 : 0}
      sx={{
        borderRadius: "30px",
        background: scrolled ? "#212529" : "#f4f6fa",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        color: scrolled ? "#f4f6fa" : "#23284b",
        boxShadow: scrolled ? "0 4px 16px rgba(44,62,80,.16)" : "none",
        left: 0,
        top: 0,
        ml: { xs: 0, lg: `${drawerWidth}px` }, 
        width: { xs: "99%", lg: `calc(99% - ${drawerWidth}px)` }, 
        zIndex: 1201,
        transition: "all 0.3s cubic-bezier(.4,.2,.6,1)",
      }}
    >
      <Toolbar>
        <Typography variant="h6" fontWeight={700}>
          Dashboard
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            background: "#ecf0f6",
            borderRadius: 2,
            px: 1,
            mr: 2,
          }}
        >
          <SearchIcon sx={{ color: "#adb5bd" }} />
          <InputBase
            placeholder="Search here"
            sx={{ ml: 1, color: "#23284b" }}
            inputProps={{ "aria-label": "search" }}
          />
        </Box>
        <IconButton
          color="inherit"
          edge="start"
          aria-label="menu"
          sx={{ display: { lg: "none" } }}
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <IconButton color="inherit">
          <NotificationsIcon />
        </IconButton>
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;
