/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useDocument } from "../../hooks/Firestore/useDocument";
import { useCollection } from "../../hooks/Firestore/useCollection";
import TitleBar from "../Header/TitleBar";

// Material UI
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
// import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import Card from "@mui/material/Card";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";

// UUID
import { v4 } from "uuid";

const EditRecipe = () => {
  let { id } = useParams();
  // Fetching data
  const { data } = useDocument("recipes", id);
  const { documents: categories } = useCollection("categories");
  const { documents: allergens } = useCollection("allergens");

  const [formValues, setFormValues] = useState();

  useEffect(() => {
    if (data) {
      setFormValues({
        ...data,
      });
    }
    console.log("no data");
  }, [JSON.stringify(data)]);

  console.log(formValues);

  const handleRecipeSteps = (e, i) => {
    const recipeStepsClone = [...formValues.recipeSteps];
    recipeStepsClone[i][e.target.name] = e.target.value;

    setFormValues({
      ...formValues,
    });
  };

  const handleRecipeStepsCount = () => {
    setFormValues({
      ...formValues,
      recipeSteps: [...formValues.recipeSteps, { step: "", id: v4() }],
    });
  };

  const handleDeleteRecipeStep = (id) => {
    if (formValues.recipeSteps.length <= 1)
      return console.log("there is nothing to delete");
    else {
      const newRecipeSteps = [...formValues.recipeSteps].filter(
        (step) => step.id !== id
      );

      setFormValues({
        ...formValues,
        recipeSteps: newRecipeSteps,
      });
    }
  };

  const handleIngredients = (e, i) => {
    let ingredientsClone = [...formValues.ingredients];
    ingredientsClone[i][e.target.name] = e.target.value;

    setFormValues({
      ...formValues,
    });
  };

  const handleIngredientsCount = () => {
    setFormValues({
      ...formValues,
      ingredients: [
        ...formValues.ingredients,
        { name: "", quantity: 1, unit: "", id: v4() },
      ],
    });
  };

  const handleDeleteIngredient = (id) => {
    if (formValues.ingredients.length < 2)
      return console.log("there is nothing to delete");
    else {
      const newIngredients = [...formValues.ingredients].filter(
        (ing) => ing.id !== id
      );

      setFormValues({
        ...formValues,
        ingredients: newIngredients,
      });
    }
  };

  if ((!data, !categories, !allergens)) {
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
      {formValues && (
        <form>
          <Card
            sx={{
              maxWidth: 400,
              margin: "auto",
              height: "auto",
              padding: "1rem",
            }}
            elevation={3}
          >
            <FormControl fullWidth>
              <TextField
                sx={{ marginBottom: "1rem" }}
                label="Naam gerecht"
                variant="standard"
                value={formValues.title}
                onChange={(e) =>
                  setFormValues({ ...formValues, title: e.target.value })
                }
                onKeyPress={(e) => e.key === "Enter" && e.preventDefault()}
              />
              <TextField
                sx={{ marginBottom: "1rem" }}
                label="Korte beschrijving"
                variant="standard"
                value={formValues.subtitle}
                onChange={(e) =>
                  setFormValues({ ...formValues, subtitle: e.target.value })
                }
                onKeyPress={(e) => e.key === "Enter" && e.preventDefault()}
              />
              <TextField
                sx={{ marginBottom: "1rem" }}
                label="Kooktijd"
                variant="standard"
                value={formValues.timing}
                onChange={(e) =>
                  setFormValues({ ...formValues, timing: e.target.value })
                }
                onKeyPress={(e) => e.key === "Enter" && e.preventDefault()}
              />
              {/* <TextField
                sx={{ marginBottom: "1rem" }}
                label="Categorie"
                variant="standard"
                select
                value={formValues.category}
                onChange={(e) =>
                  setFormValues({ ...formValues, category: e.target.value })
                }
                onKeyPress={(e) => e.key === "Enter" && e.preventDefault()}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </TextField> */}
            </FormControl>
            <FormControl>
              <InputLabel>Allergenen</InputLabel>
              <Select
                sx={{ marginBottom: "1rem" }}
                multiple
                value={formValues.allergens}
                onChange={(e) =>
                  setFormValues({ ...formValues, allergens: e.target.value })
                }
                name="allergens"
                input={<OutlinedInput label="Allergenen" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {allergens.map((allergen) => (
                  <MenuItem key={allergen.id}>{allergen.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            {formValues.recipeSteps.map((step, i) => (
              <TextField
                sx={{ marginBottom: "1rem" }}
                key={step.id}
                name="step"
                label="Voeg een bereidingsstap toe"
                value={step.step}
                onChange={(e) => handleRecipeSteps(e, i)}
                onKeyPress={(e) => e.key === "Enter" && e.preventDefault()}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        color="primary"
                        onClick={handleRecipeStepsCount}
                      >
                        <AddIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={() => handleDeleteRecipeStep(step.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            ))}

            {formValues.ingredients.map((ingredient, i) => {
              return (
                <div key={ingredient.id}>
                  <TextField
                    sx={{ marginBottom: "1rem" }}
                    label="Naam ingredient"
                    variant="standard"
                    value={ingredient.name}
                    name="name"
                    onChange={(e) => handleIngredients(e, i)}
                    onKeyPress={(e) => e.key === "Enter" && e.preventDefault()}
                  />
                  <TextField
                    sx={{ marginBottom: "1rem" }}
                    label="Hoeveelheid"
                    variant="standard"
                    name="quantity"
                    onChange={(e) => handleIngredients(e, i)}
                    value={ingredient.quantity}
                    onKeyPress={(e) => e.key === "Enter" && e.preventDefault()}
                  />
                  <TextField
                    sx={{ marginBottom: "1rem" }}
                    label="Eenheid"
                    variant="standard"
                    name="unit"
                    onChange={(e) => handleIngredients(e, i)}
                    value={ingredient.unit}
                    onKeyPress={(e) => e.key === "Enter" && e.preventDefault()}
                  />
                  <IconButton color="primary" onClick={handleIngredientsCount}>
                    <AddIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => handleDeleteIngredient(ingredient.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              );
            })}
          </Card>
        </form>
      )}
    </>
  );
};

export default EditRecipe;
