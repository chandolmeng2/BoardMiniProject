import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Box } from "@mui/material";

function MainLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = 220;

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <>
      <Topbar onMenuClick={handleDrawerToggle} />
      <Sidebar mobileOpen={mobileOpen} onClose={handleDrawerToggle} />
      <Box
        sx={{
          marginLeft: { xs: 0, lg: `${drawerWidth}px` },
          marginTop: "70px",
          padding: "30px",
          background: "#f4f6fa",
          minHeight: "100vh",
        }}
      >
        {children}
      </Box>
    </>
  );
}

export default MainLayout;
