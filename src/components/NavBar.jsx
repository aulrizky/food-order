import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Drawer,
  ListItemButton,
  Button,
  ListItemIcon,
  ListItemText,
  List,
  Menu,
  MenuItem,
} from "@mui/material";
import logo from "../public/svg/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import HistoryIcon from "@mui/icons-material/History";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

function NavDestop({ cart }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    navigate("/");
    localStorage.clear();
  };
  const handleToHistory = () => {
    navigate("/history-saya");
  };
  const handleToFav = () => {
    navigate("/favorites");
  };
  const handleToCarts = () => {
    navigate("/keranjang-saya");
  };
  return (
    <Box sx={{ display: { xs: "none", md: "flex" } }}>
      <IconButton
        size="large"
        aria-label="show new cart"
        color="inherit"
        onClick={handleToCarts}
      >
        <Badge badgeContent={cart} color="error">
          <ShoppingCartIcon></ShoppingCartIcon>
        </Badge>
      </IconButton>
      <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-controls="primary-search-account-menu"
        aria-haspopup="true"
        color="inherit"
        onClick={handleClick}
      >
        <AccountCircleIcon></AccountCircleIcon>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleToHistory}>Histori Pesanan</MenuItem>
        <MenuItem onClick={handleToFav}>Favorit Saya</MenuItem>
        <MenuItem onClick={handleLogout}>Sign out</MenuItem>
      </Menu>
    </Box>
  );
}
function NavMobile({ handleSidebarOpen }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
    localStorage.clear();
  };
  const handleToHistory = () => {
    navigate("/history-saya");
  };
  const handleToFav = () => {
    navigate("/favorites");
  };
  return (
    <Box sx={{ display: { xs: "flex", md: "none" } }}>
      <IconButton
        size="large"
        aria-haspopup="true"
        aria-label="open sidebar"
        onClick={handleSidebarOpen}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
    </Box>
  );
}
export default function NavBar({ cart }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };
  const handleSidebarOpen = () => {
    setIsSidebarOpen(true);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "grey" }}>
        <Toolbar>
          <Box
            display="flex"
            justifyContent="space-between"
            width={{ xs: "100%", md: "80%" }}
            marginX="auto"
          >
            <Box display="flex" alignItems="center">
              <img
                src={logo}
                alt="logo"
                style={{ width: "3em", marginLeft: "4em" }}
              />
              <Typography
                variant="h6"
                no
                noWrap
                component="div"
                sx={{
                  fontFamily: "Mulish-Black",
                  alignItems: "center",
                  marginLeft: { xs: "2em", sm: "unset", md: 2 },
                  fontSize: "24px",
                  fontWeight: "600",
                  lineHeight: "30px",
                }}
              >
                Food Order 79
              </Typography>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Link
                  to="/daftar-resep"
                  style={{
                    textDecoration: "none",
                    color: "#FFFFFF",
                  }}
                >
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ marginLeft: "1em" }}
                  >
                    Daftar Makanan
                  </Typography>
                </Link>
              </Box>
            </Box>
            <NavDestop cart={cart}></NavDestop>
            <NavMobile handleSidebarOpen={handleSidebarOpen}></NavMobile>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={isSidebarOpen}
        onClose={handleSidebarClose}
        sx={{
          width: "100%",
          backgroundColor: "rgba(255,255,255,0.5)",
          "& .MuiDrawer-paper": {
            width: "50%",
            backgroundColor: "#5B5B5B",
          },
        }}
      >
        <List>
          <ListItemButton>
            <ListItemIcon>
              <ListItemIcon>
                <HistoryIcon />
                <ListItemText
                  primary={
                    <Link
                      to="/history-saya"
                      style={{ textDecoration: "none", color: "#FDFDFD" }}
                    >
                      History Anda
                    </Link>
                  }
                />
              </ListItemIcon>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ListItemIcon>
                <StarBorderRoundedIcon />
                <ListItemText
                  primary={
                    <Link
                      to="/favorites"
                      style={{ textDecoration: "none", color: "#FDFDFD" }}
                    >
                      Favorit Saya
                    </Link>
                  }
                />
              </ListItemIcon>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ListItemIcon>
                <LogoutRoundedIcon />
                <ListItemText
                  primary={
                    <Link
                      to="/"
                      style={{ textDecoration: "none", color: "#FDFDFD" }}
                    >
                      Sign Out
                    </Link>
                  }
                />
              </ListItemIcon>
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Drawer>
    </Box>
  );
}

// export default NavBar;
