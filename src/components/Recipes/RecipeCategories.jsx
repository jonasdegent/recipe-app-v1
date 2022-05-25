import React from "react";
import TitleBar from "../../components/Header/TitleBar";
import RecipeCard from "./RecipeCard";
// Custom hooks
import { useCollection } from "../../hooks/Firestore/useCollection";

import { useParams } from "react-router-dom";

//Material UI imports
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";

const gridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 2,
};

const RecipeCategories = () => {
  let { category } = useParams();
  const { documents: recipes } = useCollection("recipes", [
    "category",
    "==",
    category,
  ]);
  console.log(recipes);

  if (!recipes) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <TitleBar />
        <Container>
          <CircularProgress />
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <TitleBar category={category} />
      <Container>
        <Box sx={gridContainer}>
          {recipes.map((recipe) => (
            <RecipeCard recipe={recipe} key={recipe.id} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default RecipeCategories;
