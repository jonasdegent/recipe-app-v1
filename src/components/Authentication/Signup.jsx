import { useForm } from "react-hook-form";
import TitleBar from '../Header/TitleBar'
import { useSignup } from '../../hooks/Authentication/useSignup'
import { Link as RouterLink } from 'react-router-dom';

//Material UI
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function Signup() {
  const { register, handleSubmit } = useForm();
  const { error, isPending, signup } = useSignup()
  const onSubmit = data => {
    console.log(data)
    signup(data.email, data.password, data.displayName)
  }

  return (
    <>
      <TitleBar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Schrijf je in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Adres"
                  name="email"
                  autoComplete="email"
                  {...register("email")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Paswoord"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register("password")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="displayName"
                  label="Gebruikersnaam"
                  type="text"
                  id="displayName"
                  {...register("displayName")}
                />
              </Grid>
            </Grid>
            {!isPending && 
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
              Inschrijven
              </Button>
            }
            {isPending && 
              <Button
                fullWidth
                variant="contained"
                disabled
                sx={{ mt: 3, mb: 2 }}
              >
                Aan het inschrijven!
              </Button>
            }
            {error && <p>{error}</p>}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link variant="body2" component={RouterLink} to="/login">
                  Heb je al een account? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}