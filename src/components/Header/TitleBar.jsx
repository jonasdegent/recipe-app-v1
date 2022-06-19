import React from "react";
import Dashboard from "./Dashboard";

import "./TitleBar.css";

import { Link as RouterLink } from "react-router-dom";

// Material UI imports
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";

// Custom hooks
import { useAuthContext } from "../../hooks/Authentication/useAuthContext";

const TitleBar = ({ title, category }) => {
  const { user } = useAuthContext();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar sx={{ marginBottom: 2 }} position="static">
      <Toolbar className="header">
        <Button
          color="inherit"
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MenuIcon />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <Link
            className="home-button-in-menu"
            component={RouterLink}
            to={`/`}
            sx={{ textDecoration: "none" }}
          >
            <MenuItem onClick={handleClose}>Startpagina</MenuItem>
          </Link>
          <Link
            component={RouterLink}
            to={`/categories/Ontbijt`}
            sx={{ textDecoration: "none" }}
          >
            <MenuItem onClick={handleClose}>Ontbijt</MenuItem>
          </Link>
          <Link
            component={RouterLink}
            to={`/categories/Voorgerecht`}
            sx={{ textDecoration: "none" }}
          >
            <MenuItem onClick={handleClose}>Voorgerechten</MenuItem>
          </Link>
          <Link
            component={RouterLink}
            to={`/categories/Hoofdgerecht`}
            sx={{ textDecoration: "none" }}
          >
            <MenuItem onClick={handleClose}>Hoofdgerechten</MenuItem>
          </Link>
          <Link
            component={RouterLink}
            to={`/categories/Dessert`}
            sx={{ textDecoration: "none" }}
          >
            <MenuItem onClick={handleClose}>Desserts</MenuItem>
          </Link>
          <Link
            component={RouterLink}
            to={`/categories/Tussendoortje`}
            sx={{ textDecoration: "none" }}
          >
            <MenuItem onClick={handleClose}>Tussendoortjes</MenuItem>
          </Link>
        </Menu>

        <Breadcrumbs
          className="breadcrumbs"
          aria-label="breadcrumb"
          sx={{ flexGrow: 1 }}
        >
          <Link underline="hover" color="white" href="/">
            <HomeIcon />
          </Link>
          {category && (
            <Link
              underline="hover"
              color="white"
              component={RouterLink}
              to={`/categories/${category}`}
            >
              <Typography color="white">{category}</Typography>
            </Link>
          )}
          {title && <Typography color="white">{title}</Typography>}
        </Breadcrumbs>

        {user && <Typography>Hallo, {user.displayName}</Typography>}
        <Dashboard />
      </Toolbar>
    </AppBar>
  );
};

export default TitleBar;
