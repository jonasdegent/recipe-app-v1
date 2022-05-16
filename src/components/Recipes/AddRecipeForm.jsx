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
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from "@mui/material/Chip";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Card } from '@mui/material';

const defaultValues = {
  title: "",
  subtitle: "",
  timing: "",
  category: "Hoofdgerecht",
  allergens: []
}

const AddRecipeForm = () => {
  const { documents : recipes } = useCollection('recipes')
  const { documents : allergens } = useCollection('allergens')

  const [formValues, setFormValues] = useState(defaultValues)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues, [name]: typeof value === "string" ? value.split(",") : value
      
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
    <FormControl sx={{marginLeft: 3}}>
      <TextField
        label="Naam gerecht" 
        variant="standard" 
        name="title"
        value={formValues.title}
        onChange={handleInputChange}
      />
      <TextField 
        label="Korte beschrijving" 
        variant="standard" 
        name="subtitle"
        value={formValues.subtitle}
        onChange={handleInputChange}
      />
      <TextField 
        label="Kooktijd"
        variant="standard" 
        name="timing"
        value={formValues.timing}
        onChange={handleInputChange}
      />
      <TextField 
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
        multiple
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
      <Button variant="contained" color="primary" type="submit">
        Voeg recept toe
      </Button>
    </FormControl>
    </form>
  )
}

export default AddRecipeForm