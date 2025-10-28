import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TableChartIcon from "@mui/icons-material/TableChart";
import ReceiptIcon from "@mui/icons-material/Receipt";

const drawerWidth = 220;

function Sidebar() {
  return (
    <Drawer
  variant="permanent"
  sx={{
    width: drawerWidth,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      background: "#23284b",
      color: "#fff",
      border: "none",
      borderRadius: "18px",
      margin: "14px 0 14px 14px",
      boxShadow: "0 2px 14px rgba(44,62,80,0.18)",
      height: "100vh",      // 전체 화면 높이로!
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start"
    }
  }}
>

      <Toolbar />
      <List>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <TableChartIcon sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Tables" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ReceiptIcon sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Billing" />
        </ListItem>
        {/* 다른 Nav 항목도 이 패턴으로 추가 */}
      </List>
    </Drawer>
  );
}

export default Sidebar;
