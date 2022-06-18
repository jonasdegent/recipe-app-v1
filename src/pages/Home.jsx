import React from "react";
import RecipeList from "../components/Recipes/RecipeList";
import TitleBar from "../components/Header/TitleBar";
import "./Home.css";
// React Router
import { Link as RouterLink } from "react-router-dom";

// Custom hooks
import { useCollection } from "../hooks/Firestore/useCollection";

//Material UI imports
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const Home = () => {
  const { documents: recipes } = useCollection("recipes");

  return (
    <>
      <TitleBar recipes={recipes} />
      <div className="recipes-container">
        {recipes && <RecipeList recipes={recipes} />}
        <Fab
          color="primary"
          aria-label="add"
          sx={{ marginTop: 2, marginLeft: 2 }}
          component={RouterLink}
          to="/recepttoevoegen"
        >
          <AddIcon />
        </Fab>
      </div>
    </>
  );
};

export default Home;
