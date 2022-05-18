import { useState } from 'react';

// Custom hooks
import { useCollection } from '../../hooks/Firestore/useCollection'

// Material UI
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box'
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from "@mui/material/Chip";
import FormControl from '@mui/material/FormControl';
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

const defaultValues = {
  title: "",
  subtitle: "",
  timing: "",
  category: "Hoofdgerecht",
  allergens: [],
  ingredients: [
    { name: 'Witloof',
      quantity: 1,
      unit: ''
    }
  ]
}

const AddRecipeForm = () => {
  const { documents : recipes } = useCollection('recipes')
  const { documents : allergens } = useCollection('allergens')

  const [formValues, setFormValues] = useState(defaultValues)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
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
      <Card sx={{ maxWidth: 400, margin: 'auto', height: 'auto', padding: '1rem' }} elevation={3}>
        <FormControl sx={{marginLeft:5}}>
          <TextField
            sx={{ marginBottom: '1rem'}}
            label="Naam gerecht" 
            variant="standard" 
            name="title"
            value={formValues.title}
            onChange={handleInputChange}
          />
          <TextField
            sx={{ marginBottom: '1rem' }} 
            label="Korte beschrijving" 
            variant="standard" 
            name="subtitle"
            value={formValues.subtitle}
            onChange={handleInputChange}
          />
          <TextField 
            sx={{ marginBottom: '1rem' }} 
            label="Kooktijd"
            variant="standard" 
            name="timing"
            value={formValues.timing}
            onChange={handleInputChange}
          />
          <TextField 
            sx={{ marginBottom: '1rem' }} 
            label="Categorie" 
            select
            name="category"
            value={formValues.category}
            onChange={handleInputChange}
            variant="standard" 
          >
            { [...undupedCategories].map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>  
          <Select
            sx={{ marginBottom: '1rem' }} 
            multiple
            label='allergenen'
            value={formValues.allergens}
            onChange={handleInputChange}
            name="allergens"
            input={<OutlinedInput label='Allergenen' />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {allergens.map((allergen) => (
              <MenuItem
                key={allergen.id}
                value={allergen.name}
              >
                {allergen.name}
              </MenuItem>
            ))}
          </Select>
          <Grid>
            <TextField 
              sx={{ marginBottom: '1rem' }} 
              label="Ingredient"
              variant="standard" 
              name="timing"
              value={formValues.ingredients[0].name}
              onChange={handleInputChange}
            />
          </Grid>

          <Button variant="contained" color="primary" type="submit">
            Voeg recept toe
          </Button>
        </FormControl>
      </Card>
    </form>
  )
}

export default AddRecipeForm