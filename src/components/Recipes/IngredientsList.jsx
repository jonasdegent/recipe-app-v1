import { useState } from "react";

// Material UI
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

const IngredientsList = ({ id, ingredients }) => {
  const [servings, setServings] = useState(2);

  return (
    <div className="recipe-detail-ingredients">
      <Typography variant="h5">Ingrediënten</Typography>
      <div className="recipe-detail-counter-servings">
        <IconButton
          color="primary"
          onClick={() => setServings(servings - 1)}
          disabled={servings <= 1}
        >
          <RemoveCircleRoundedIcon />
        </IconButton>
        Hoeveel personen: {servings}
        <IconButton color="primary" onClick={() => setServings(servings + 1)}>
          <AddCircleRoundedIcon />
        </IconButton>
      </div>
      <ul className="recipe-detail-ingredients-list">
        {ingredients.map((ingredient) => {
          return (
            <li key={ingredient.id}>
              <span className="recipe-detail-ingredients-quantity">
                {ingredient.quantity * servings}
              </span>{" "}
              <span className="recipe-detail-ingredients-unit">
                {ingredient.unit}
              </span>{" "}
              <span className="recipe-detail-ingredients-name">
                {ingredient.name.toLowerCase()}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default IngredientsList;
