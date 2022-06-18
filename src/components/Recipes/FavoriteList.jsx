import React from "react";
// Custom hooks
import { useCollection } from "../../hooks/Firestore/useCollection";
import { useAuthContext } from "../../hooks/Authentication/useAuthContext";
//Material UI
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import TitleBar from "../Header/TitleBar";
import RecipeCard from "./RecipeCard";

const FavoriteList = () => {
  const { user } = useAuthContext();
  const { documents: recipes } = useCollection("recipes", [
    "createdBy",
    "==",
    user.displayName,
  ]);
  const { documents: singleUser } = useCollection("users", [
    "displayName",
    "==",
    user.displayName,
  ]);

  if (!recipes) {
    return (
      <>
        <Container>
          <CircularProgress />
        </Container>
      </>
    );
  }

  return (
    <>
      <TitleBar />
      <div className="favorite-wrapper">
        <div className="recipe-list">
          {recipes.map((recipe) => (
            <RecipeCard
              recipe={recipe}
              key={recipe.id}
              singleUser={singleUser}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default FavoriteList;
