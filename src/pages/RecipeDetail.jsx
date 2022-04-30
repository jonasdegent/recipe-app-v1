import React from 'react'
import { useParams } from 'react-router-dom'

const RecipeDetail = () => {
  let { id } = useParams();
  
  return (
    <div>The ID of the recipe is {id}</div>
  )
}

export default RecipeDetail