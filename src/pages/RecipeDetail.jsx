import React from "react";
import { useParams } from "react-router-dom";
import { useDocument } from "../hooks/Firestore/useDocument";
import "./RecipeDetail.css";

import TitleBar from "../components/Header/TitleBar";

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
      {data && <TitleBar title={data.title} category={data.category} />}
      <div className="recipe-detail-wrapper">
        {data && (
          <div className="recipe-detail-container">
            <div>
              <Typography variant="h4">{data.title}</Typography>
              <Typography sx={{ fontStyle: "italic" }} variant="subtitle">
                {data.subtitle}
              </Typography>
              <ol className="recipe-detail-steps">
                {data.recipeSteps.map((recipeStep) => (
                  <li key={recipeStep.id}>{recipeStep.step}</li>
                ))}
              </ol>
            </div>
            <div className="recipe-detail-image">
              <img src={data.imageUrl} alt={`${data.title} ${data.subtitle}`} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RecipeDetail;
