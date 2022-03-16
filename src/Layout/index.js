import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Outlet, useNavigate } from "react-router-dom";
import sidebar from "../constants/sidebar";

const drawerWidth = 240;

export default function Layout(props) {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <img
            src="/loan.png"
            alt="logo"
            style={{
              width: "40px",
              margin: "0 10px",
            }}
          />
          <Typography variant="h6" noWrap component="div">
            Loan Management Software
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {sidebar.first.map((item, index) => (
              <ListItem
                button
                onClick={() => navigate(item.route)}
                key={item.title}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
