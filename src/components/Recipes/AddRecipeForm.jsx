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
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel'

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
  ],
  recipeSteps: ['']
}

const AddRecipeForm = () => {
  const { documents : recipes } = useCollection('recipes')
  const { documents : allergens } = useCollection('allergens')

  const [formValues, setFormValues] = useState(defaultValues)

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues)
  }

  const handleRecipeSteps = (e, i) => {
    const recipeStepsClone = [...formValues.recipeSteps]
    recipeStepsClone[i] = e.target.value
    
    setFormValues({
      ...formValues,
      recipeSteps: recipeStepsClone
    })
  }

  const handleRecipeStepsCount = () => {
    setFormValues({
      ...formValues,
      recipeSteps: [...formValues.recipeSteps, ""]
    })
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
        <FormControl fullWidth>
          <TextField
            sx={{ marginBottom: '1rem'}}
            label="Naam gerecht" 
            variant="standard" 
            value={formValues.title}
            onChange={e => setFormValues({...formValues, title: e.target.value})}
            onKeyPress={e => e.key === 'Enter' && e.preventDefault()}
          />
          <TextField
            sx={{ marginBottom: '1rem' }} 
            label="Korte beschrijving" 
            variant="standard" 
            value={formValues.subtitle}
            onChange={e => setFormValues({...formValues, subtitle: e.target.value})}
            onKeyPress={e => e.key === 'Enter' && e.preventDefault()}
          />
          <TextField 
            sx={{ marginBottom: '1rem' }} 
            label="Kooktijd"
            variant="standard" 
            value={formValues.timing}
            onChange={e => setFormValues({...formValues, timing: e.target.value})}
            onKeyPress={e => e.key === 'Enter' && e.preventDefault()}
          />
          <TextField 
            sx={{ marginBottom: '1rem' }} 
            label="Categorie"
            variant="standard" 
            select
            value={formValues.category}
            onChange={e => setFormValues({...formValues, category: e.target.value})}
            onKeyPress={e => e.key === 'Enter' && e.preventDefault()}
          >
            { [...undupedCategories].map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>  
          <FormControl>
            <InputLabel>Allergenen</InputLabel>
            <Select
              sx={{ marginBottom: '1rem' }} 
              multiple
              value={formValues.allergens}
              onChange={e => setFormValues({...formValues, allergens: e.target.value})}
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
          </FormControl>
            {
              formValues.recipeSteps.map((step, i) => (
                <TextField
                  sx={{ marginBottom: '1rem' }}
                  key={i}
                  label="Voeg een bereiding toe"
                  onChange={e => handleRecipeSteps(e, i)}
                  onKeyPress={e => e.key === 'Enter' && e.preventDefault()}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end" color="primary" onClick={handleRecipeStepsCount}>
                          <AddIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              ))
            }


          <Button variant="contained" color="primary" type="submit">
            Voeg recept toe
          </Button>
        </FormControl>
      </Card>
    </form>
  )
}

export default AddRecipeForm