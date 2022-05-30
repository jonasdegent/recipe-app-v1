import React from "react";
import RecipeCard from "./RecipeCard";

// Custom hooks
import { useCollection } from "../../hooks/Firestore/useCollection";
import { useAuthContext } from "../../hooks/Authentication/useAuthContext";

//Material UI imports
import Box from "@mui/material/Box";

//Template for grid system Material UI
const gridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 2,
};

const RecipeList = ({ recipes }) => {
  const { user } = useAuthContext();
  // Hier gebruik ik de useCollection hook MET een query op de ingelogde user!
  const { documents: singleUser } = useCollection("users", [
    "displayName",
    "==",
    user.displayName,
  ]);
  return (
    <Box sx={gridContainer}>
      {recipes.map((recipe) => (
        <RecipeCard recipe={recipe} key={recipe.id} singleUser={singleUser} />
      ))}
    </Box>
  );
};

export default RecipeList;
