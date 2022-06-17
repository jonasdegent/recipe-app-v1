import { useState } from "react";

// react router
import { useNavigate } from "react-router-dom";

// Custom hooks
import { useCollection } from "../../hooks/Firestore/useCollection";
import { useAuthContext } from "../../hooks/Authentication/useAuthContext";

// Firebase Firestore database
import { db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";

// Firebase Storage
import { storage } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// UUID
import { v4 } from "uuid";

// Material UI
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
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

const AddRecipeForm = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const defaultValues = {
    title: "",
    subtitle: "",
    timing: "",
    category: "Hoofdgerecht",
    allergens: [],
    ingredients: [{ name: "", quantity: 1, unit: "", id: v4() }],
    recipeSteps: [{ step: "", id: v4() }],
    imageUrl: "",
    createdBy: user.displayName,
  };

  const { documents: recipes } = useCollection("recipes");
  const { documents: allergens } = useCollection("allergens");
  const { documents: categories } = useCollection("categories");

  const [formValues, setFormValues] = useState(defaultValues);
  const [imageUpload, setImageUpload] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const ref = collection(db, "recipes");
    await addDoc(ref, formValues);
    setFormValues(defaultValues);
    navigate("/");
  };

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

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `${v4() + imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      getDownloadURL(imageRef).then((url) => {
        setFormValues({ ...formValues, imageUrl: url });
      });
    });
  };

  if ((!recipes, !allergens, !categories)) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Container>
          <CircularProgress />
        </Container>
      </Box>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card
        sx={{ maxWidth: 400, margin: "auto", height: "auto", padding: "1rem" }}
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
          <TextField
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
          </TextField>
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
                <MenuItem key={allergen.id} value={allergen.name}>
                  {allergen.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {formValues.recipeSteps.map((step, i) => (
            <TextField
              sx={{ marginBottom: "1rem" }}
              key={step.id}
              name="step"
              label="Voeg een bereidingsstap toe"
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
          {/* // Ingrediënten */}
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
          <div>
            {formValues.imageUrl ? (
              <img
                src={formValues.imageUrl}
                style={{
                  width: "100px",
                  height: "100px",
                  marginBottom: "1rem",
                }}
                alt={formValues.title}
              />
            ) : (
              <>
                <TextField
                  sx={{ marginBottom: "1rem" }}
                  type="file"
                  onChange={(e) => {
                    setImageUpload(e.target.files[0]);
                  }}
                />
                <Button
                  variant="contained"
                  component="span"
                  sx={{ marginBottom: "1rem" }}
                  onClick={uploadImage}
                >
                  Voeg een foto toe
                </Button>
              </>
            )}
          </div>
          <Button variant="contained" color="primary" type="submit">
            Voeg recept toe
          </Button>
        </FormControl>
      </Card>
    </form>
  );
};

export default AddRecipeForm;
