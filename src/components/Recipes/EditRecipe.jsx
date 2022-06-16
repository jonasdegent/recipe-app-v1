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
// import Select from "@mui/material/Select";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import Card from "@mui/material/Card";
// import AddIcon from "@mui/icons-material/Add";
// import DeleteIcon from "@mui/icons-material/Delete";
// import IconButton from "@mui/material/IconButton";
// import InputAdornment from "@mui/material/InputAdornment";
// import InputLabel from "@mui/material/InputLabel";

const EditRecipe = () => {
  let { id } = useParams();
  const { data } = useDocument("recipes", id);
  const { documents: categories } = useCollection("categories");
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    if (data) {
      setFormValues({
        title: data.title,
        subtitle: data.subtitle,
        timing: data.timing,
        category: data.category,
      });
    }
  }, [JSON.stringify(data)]);

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
          </FormControl>
        </Card>
      </form>
    </>
  );
};

export default EditRecipe;
