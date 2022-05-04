import { useState } from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link as RouterLink } from 'react-router-dom';
import { useLogout } from '../../hooks/Authentication/useLogout';

export default function Dashboard() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { logout } = useLogout()

  return (
    <div>
      <Button
        color="inherit"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
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
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose} component={RouterLink} to="/login">Log in</MenuItem>
        <MenuItem onClick={handleClose} component={RouterLink} to="/signup">Inschrijven</MenuItem>
        <MenuItem onClick={() => {
          handleClose();
          logout()
          }}
        >
          Uitloggen
        </MenuItem>
      </Menu>
    </div>
  );
}