import React from 'react'
import RecipeCard from './RecipeCard'

//Material UI imports
import Box from '@mui/material/Box'

//Template for grid system Material UI
const gridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 2
}

const RecipeList = ({ recipes }) => {
  return (
    <Box sx={gridContainer}>
      {recipes.map(recipe => (
          <RecipeCard recipe={recipe} key={recipe.id}/>
      ))}
    </Box>
  )
}

export default RecipeList