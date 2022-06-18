import { useState } from "react";
import { Link } from "react-router-dom";

// Material UI
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SummarizeIcon from "@mui/icons-material/Summarize";

const IngredientsList = ({ id, ingredients }) => {
  const [servings, setServings] = useState(2);
  const [shoppingList, setShoppingList] = useState([]);

  const handleCheck = (e) => {
    let updatedList = [...shoppingList];
    if (e.target.checked) {
      updatedList = [...shoppingList, e.target.value];
    } else {
      updatedList.splice(shoppingList.indexOf(e.target.value), 1);
    }
    setShoppingList(updatedList);
  };

  return (
    <div className="recipe-detail-ingredients">
      <div className="recipe-detail-ingredients-header">
        <Typography variant="h5" sx={{ marginLeft: ".25em" }}>
          Ingrediënten
        </Typography>
        <Link to={`/shoppinglist`} state={{ shoppingList: shoppingList }}>
          <IconButton color="primary">
            <SummarizeIcon />
          </IconButton>
        </Link>
      </div>
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
      <form>
        <ul className="recipe-detail-ingredients-list">
          {ingredients.map((ingredient) => {
            return (
              <li key={ingredient.id}>
                <Checkbox
                  size="small"
                  color="success"
                  icon={<CheckCircleOutlineIcon />}
                  checkedIcon={<CheckCircleIcon />}
                  type="checkbox"
                  name="items"
                  value={`${ingredient.quantity * servings} ${
                    ingredient.unit
                  } ${ingredient.name.toLowerCase()}`}
                  onChange={handleCheck}
                />
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
      </form>
    </div>
  );
};

export default IngredientsList;
