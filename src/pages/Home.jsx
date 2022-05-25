import React from "react";
import RecipeList from "../components/Recipes/RecipeList";

// React Router
import { Link as RouterLink } from "react-router-dom";

// Custom hooks
import { useCollection } from "../hooks/Firestore/useCollection";

//Material UI imports
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TitleBar from "../components/Header/TitleBar";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const Home = () => {
  const { documents: recipes } = useCollection("recipes");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <TitleBar recipes={recipes} />
      <Container>
        {recipes && <RecipeList recipes={recipes} />}
        <Fab
          color="primary"
          aria-label="add"
          sx={{ marginTop: 2 }}
          component={RouterLink}
          to="/recepttoevoegen"
        >
          <AddIcon />
        </Fab>
      </Container>
    </Box>
  );
};

export default Home;
