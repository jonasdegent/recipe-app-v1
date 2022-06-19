import React from "react";
import { useParams } from "react-router-dom";
import { useDocument } from "../hooks/Firestore/useDocument";
import "./RecipeDetail.css";

import TitleBar from "../components/Header/TitleBar";
import IngredientsList from "../components/Recipes/IngredientsList";

// Custom hooks
import { useCollection } from "../hooks/Firestore/useCollection";

//Material UI
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

const RecipeDetail = () => {
  let { id } = useParams();
  const { data } = useDocument("recipes", id);
  const { documents: allergens } = useCollection("allergens");

  if ((!data, !allergens)) {
    return (
      <>
        <TitleBar />
        <Container>
          <CircularProgress />
        </Container>
      </>
    );
  }

  const filteredAllergens = allergens.filter((allergen) => {
    return data.allergens.find((selected) => selected === allergen.name);
  });

  console.log(filteredAllergens);

  return (
    <>
      <TitleBar title={data.title} category={data.category} />
      <div className="recipe-detail-wrapper">
        <div className="recipe-detail-container">
          <div className="recipe-detail-left-content">
            <div className="recipe-detail-header">
              <span>
                <Typography variant="h3">{data.title}</Typography>
                <Typography sx={{ fontStyle: "italic" }} variant="subtitle">
                  {data.subtitle}
                </Typography>
              </span>
              <div className="recipe-detail-allergens-header">
                {filteredAllergens.map((allergen, i) => (
                  <div className="recipe-detail-allergens-list">
                    <img
                      key={i}
                      className="recipe-detail-icon-allergen"
                      src={allergen.imageUrl}
                      alt={`icoon van het allergeen ${allergen.name}`}
                    />
                    <p>{allergen.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <Typography variant="h4">Hoe maak je het?</Typography>
            <ol className="recipe-detail-steps">
              {data.recipeSteps.map((recipeStep) => (
                <li key={recipeStep.id}>{recipeStep.step}</li>
              ))}
            </ol>
          </div>
          <div className="recipe-detail-right-content">
            <img src={data.imageUrl} alt={`${data.title} ${data.subtitle}`} />
            <IngredientsList id={id} ingredients={data.ingredients} />
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeDetail;
