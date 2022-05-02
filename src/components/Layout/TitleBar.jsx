import React from 'react'

//Material UI imports
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

import { Link as RouterLink } from 'react-router-dom';

const TitleBar = ({title, category}) => {
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
      <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  )
}

export default TitleBar