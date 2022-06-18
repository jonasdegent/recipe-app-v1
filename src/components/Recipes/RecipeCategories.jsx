import React from "react";
import TitleBar from "../../components/Header/TitleBar";
import RecipeCard from "./RecipeCard";
import "./RecipeList.css";

// Custom hooks
import { useCollection } from "../../hooks/Firestore/useCollection";
import { useParams } from "react-router-dom";

//Material UI imports
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";

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
      <>
        <TitleBar />
        <Container>
          <CircularProgress />
        </Container>
      </>
    );
  }

  return (
    <>
      <TitleBar category={category} />
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.id} />
        ))}
      </div>
    </>
  );
};

export default RecipeCategories;
