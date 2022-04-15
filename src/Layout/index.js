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
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import sidebar from "../constants/sidebar";
import { connect } from "react-redux";

const drawerWidth = 200;

function Layout(props) {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!props?.auth?.isAuthenticated) {
      navigate("/");
    }
  }),
    [props.auth.isAuthenticated];
  const { pathname } = useLocation();
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
            {props?.auth?.user?.type === "user"
              ? sidebar.first.map((item, index) => (
                  <ListItem
                    button
                    onClick={() => navigate(item.route)}
                    key={item.title}
                    selected={pathname === item.route}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.title} />
                  </ListItem>
                ))
              : sidebar.second.map((item, index) => (
                  <ListItem
                    button
                    onClick={() => navigate(item.route)}
                    key={item.title}
                    selected={pathname === item.route}
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

export default connect(
  (state) => ({
    auth: state.auth,
  }),
  null
)(Layout);
