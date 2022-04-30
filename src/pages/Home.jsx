import React from 'react'
import { useCollection } from '../hooks/useCollection'

import RecipeList from '../components/RecipeList'

//Material UI imports
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Home = () => {
  //hier gebruik ik de customhook useCollection en pass ik de naam van de collection die ik nodig heb in, ik rename ook documents naar recipes for readability
  const { documents: recipes } = useCollection('recipes')
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ marginBottom: 2 }} position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Recepten
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container>
        {recipes && <RecipeList recipes={recipes} />}
      </Container>
    </Box>
    
  )
}

export default Home