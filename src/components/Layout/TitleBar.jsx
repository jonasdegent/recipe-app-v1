import React from 'react'
import Dashboard from '../../components/Layout/Dashboard'

// Material UI imports
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

// Custom hooks
import { useAuthContext } from "../../hooks/Authentication/useAuthContext";

const TitleBar = ({title, category}) => {
  const { user } = useAuthContext()

  return (
    <AppBar sx={{ marginBottom: 2 }} position="static">
      <Toolbar>
      <Breadcrumbs aria-label="breadcrumb" sx={{ flexGrow: 1 }}>
        <Link 
          underline="hover" 
          color="white" 
          href="/">
            <Typography color="white" variant="h6" component="span">Recepten</Typography>
        </Link>
        {category && 
        <Link 
          underline="hover" 
          color="white" 
          href="/">
            <Typography color="white">{category}</Typography>
        </Link>}
        {title && <Typography color="white">{title}</Typography>}
      </Breadcrumbs>
        {user && <Typography>Hallo, {user.displayName}</Typography>}
        <Dashboard />
      </Toolbar>
    </AppBar>
  )
}

export default TitleBar