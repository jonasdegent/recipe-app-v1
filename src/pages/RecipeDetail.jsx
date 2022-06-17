import React from "react";
import { useParams } from "react-router-dom";
import { useDocument } from "../hooks/Firestore/useDocument";
import "./RecipeDetail.css";

import TitleBar from "../components/Header/TitleBar";
import IngredientsList from "../components/Recipes/IngredientsList";

//Material UI
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

const RecipeDetail = () => {
  let { id } = useParams();
  const { data } = useDocument("recipes", id);

  if (!data) {
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
    <>
      <TitleBar title={data.title} category={data.category} />
      <div className="recipe-detail-wrapper">
        <div className="recipe-detail-container">
          <div>
            <div className="recipe-detail-header">
              <Typography variant="h3">{data.title}</Typography>
              <Typography sx={{ fontStyle: "italic" }} variant="subtitle">
                {data.subtitle}
              </Typography>
            </div>
            <div>Icons allergens</div>
            <Typography variant="h4">Hoe maak je het?</Typography>
            <ol className="recipe-detail-steps">
              {data.recipeSteps.map((recipeStep) => (
                <li key={recipeStep.id}>{recipeStep.step}</li>
              ))}
            </ol>
          </div>
          <span className="recipe-detail-right-content">
            <img src={data.imageUrl} alt={`${data.title} ${data.subtitle}`} />
            <IngredientsList id={id} ingredients={data.ingredients} />
          </span>
        </div>
      </div>
    </>
  );
};

export default RecipeDetail;
