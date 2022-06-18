import React from "react";
import RecipeCard from "./RecipeCard";
import "./RecipeList.css";

// Custom hooks
import { useCollection } from "../../hooks/Firestore/useCollection";
import { useAuthContext } from "../../hooks/Authentication/useAuthContext";

const RecipeList = ({ recipes }) => {
  const { user } = useAuthContext();
  // Hier gebruik ik de useCollection hook MET een query op de ingelogde user!
  const { documents: singleUser } = useCollection("users", [
    "displayName",
    "==",
    user.displayName,
  ]);

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard recipe={recipe} key={recipe.id} singleUser={singleUser} />
      ))}
    </div>
  );
};

export default RecipeList;
