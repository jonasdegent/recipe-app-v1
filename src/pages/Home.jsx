import React from 'react'
import { useCollection } from '../hooks/Firestore/useCollection'
import RecipeList from '../components/RecipeList'

//Material UI imports
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TitleBar from '../components/Layout/TitleBar';

const Home = () => {
  const { documents: recipes } = useCollection('recipes')
  return (
    <Box sx={{ flexGrow: 1 }}>
      <TitleBar recipes={recipes}/>
      <Container>
        {recipes && <RecipeList recipes={recipes} />}
      </Container>
    </Box>
    
  )
}

export default Home