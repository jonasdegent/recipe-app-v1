import { useState } from "react";

// Material UI
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// React Router
import { Link as RouterLink } from "react-router-dom";

// Custom hooks
import { useLogout } from "../../hooks/Authentication/useLogout";
import { useAuthContext } from "../../hooks/Authentication/useAuthContext";

export default function Dashboard() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <div>
      <Button
        sx={{ marginLeft: 1 }}
        color="inherit"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <AccountCircleIcon />
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
        {!user && [
          <MenuItem
            onClick={handleClose}
            component={RouterLink}
            to="/login"
            key="login"
          >
            Log in
          </MenuItem>,
          <MenuItem
            onClick={handleClose}
            component={RouterLink}
            to="/signup"
            key="signup"
          >
            Inschrijven
          </MenuItem>,
        ]}
        {user && (
          <MenuItem
            onClick={() => {
              handleClose();
              logout();
            }}
            key="clickfunction"
          >
            Uitloggen
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
