import React from "react";
import Dashboard from "./Dashboard";

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
      <Toolbar>
        <div>
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
            <Link component={RouterLink} to={`/categories/Ontbijt`}>
              <MenuItem onClick={handleClose}>Ontbijt</MenuItem>
            </Link>
            <Link component={RouterLink} to={`/categories/Voorgerecht`}>
              <MenuItem onClick={handleClose}>Voorgerechten</MenuItem>
            </Link>
            <Link component={RouterLink} to={`/categories/Hoofdgerecht`}>
              <MenuItem onClick={handleClose}>Hoofdgerechten</MenuItem>
            </Link>
            <Link component={RouterLink} to={`/categories/Dessert`}>
              <MenuItem onClick={handleClose}>Desserts</MenuItem>
            </Link>
            <Link component={RouterLink} to={`/categories/Tussendoortje`}>
              <MenuItem onClick={handleClose}>Tussendoortjes</MenuItem>
            </Link>
          </Menu>
        </div>
        <Breadcrumbs aria-label="breadcrumb" sx={{ flexGrow: 1 }}>
          <Link underline="hover" color="white" href="/">
            <Typography color="white" variant="h6" component="span">
              Recepten
            </Typography>
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
