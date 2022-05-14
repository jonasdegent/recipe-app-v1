import { useState } from 'react';

// Custom hooks
import { useCollection } from '../../hooks/Firestore/useCollection'

// Material UI
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box'
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button';

const defaultValues = {
  title: "",
  subtitle: "",
  timing: "",
  category: "Hoofdgerecht"
}

const AddRecipeForm = () => {
  const { documents : recipes } = useCollection('recipes')

  const [formValues, setFormValues] = useState(defaultValues)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues, [name]: value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues)
  }

  if (!recipes) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Container>
          <CircularProgress />
        </Container>
      </Box>
    )
  }
  
  // Een set van de categorieen gemaakt om alle duplicates te filteren
  const categories = recipes.map((category, index) => category.category)
  const undupedCategories = new Set(categories);

  return (
    <form onSubmit={handleSubmit}>
      <Grid>
        <TextField
          label="Naam gerecht" 
          variant="standard" 
          size="small"
          name="title"
          value={formValues.title}
          onChange={handleInputChange}
        />
        <TextField 
          label="Korte beschrijving" 
          variant="standard" 
          size="small"
          name="subtitle"
          value={formValues.subtitle}
          onChange={handleInputChange}
        />
        <TextField 
          label="Kooktijd"
          variant="standard" 
          size="small"
          name="timing"
          value={formValues.timing}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid>
        <TextField 
          label="Categorie" 
          select
          name="category"
          value={formValues.category}
          onChange={handleInputChange}
          variant="standard" 
          size="small"
        >
          { [...undupedCategories].map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Button variant="contained" color="primary" type="submit">
          Voeg recept toe
      </Button>
    </form>
  )
}

export default AddRecipeForm