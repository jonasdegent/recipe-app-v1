import React from 'react'
import { useParams } from 'react-router-dom'
import { useDocument } from '../hooks/Firestore/useDocument'

import TitleBar from '../components/Header/TitleBar';

//Material UI
import Box from '@mui/material/Box'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';


const RecipeDetail = () => {
  let { id } = useParams();
  const { data } = useDocument('recipes', id)

  if (!data) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <TitleBar />
        <Container>
          <CircularProgress />
        </Container>
      </Box>
    )
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      {data && <TitleBar title={data.title} category={data.category}/>}
      <Container>
        {data && <Typography variant='h4'>{data.title}</Typography>}
      </Container>
    </Box>
  )
}

export default RecipeDetail