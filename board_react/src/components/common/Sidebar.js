import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TableChartIcon from "@mui/icons-material/TableChart";
import ReceiptIcon from "@mui/icons-material/Receipt";

const drawerWidth = 220;

function Sidebar({ mobileOpen, onClose }) {
  return (
    <>
      {/* 데스크톱 모드 */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", lg: "block" },
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
            height: "100vh", // 전체 화면 높이로!
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          },
        }}
        open
      >
        <Toolbar />
        <List>
          <ListItem button='true'>
            <ListItemIcon>
              <DashboardIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button='true'>
            <ListItemIcon>
              <TableChartIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Tables" />
          </ListItem>
          <ListItem button='true'>
            <ListItemIcon>
              <ReceiptIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Billing" />
          </ListItem>
          {/* 다른 Nav 항목도 이 패턴으로 추가 */}
        </List>
      </Drawer>

      {/* 모바일 모드 */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", lg: "none" },
          zIndex: 1300,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            background: "#23284b",
            color: "#fff",
            border: "none",
            borderRadius: "18px",
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItem button='true'>
            <ListItemIcon>
              <DashboardIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button='true'>
            <ListItemIcon>
              <TableChartIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Tables" />
          </ListItem>
          <ListItem button='true'>
            <ListItemIcon>
              <ReceiptIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Billing" />
          </ListItem>
          {/* 다른 Nav 항목도 이 패턴으로 추가 */}
        </List>
      </Drawer>
    </>
  );
}

export default Sidebar;
