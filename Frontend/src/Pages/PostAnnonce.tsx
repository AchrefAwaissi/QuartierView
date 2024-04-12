import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AddHomeOutlinedIcon from '@mui/icons-material/AddHomeOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { SelectChangeEvent } from '@mui/material/Select';
import AdresMas from '../Components/LocationAPI';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <a href="https://mui.com/" target="_blank" rel="noopener noreferrer">
        Quartier Vue
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
 
const defaultTheme = createTheme();

export default function Publish() {
  const navigate = useNavigate();
  const [title, setTitle] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [price, setPrice] = React.useState<number | null>(null); // Initialize price to null
  const [type, setType] = React.useState<string | null>(null); // Initialize type to null
  const [formValid, setFormValid] = React.useState(false); // État pour suivre la validité du formulaire

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await insertData(title, address, price, type);
      setTitle('');
      setAddress('');
      setPrice(null); // Reset price to null after form submission
      setType(null); // Reset type to null after form submission
      navigate('/ListeAnnonce'); // Use navigate to redirect to homepage
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleMapChange = (newAddress: string) => {
    setAddress(newAddress);
    // You can update location state here if necessary
    setFormValid(validateForm());
  };

  const insertData = async (title: string, address: string, price: number | null, type: string | null) => {
    try {
      const response = await axios.post('http://localhost:3000/api/annonce', { title, address, price, type });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to insert data');
    }
  };
 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'address') {
      setAddress(value);
    } else if (name === 'price') {
      setPrice(value === '' ? null : Number(value)); // Convert value to a number or null if empty
    }
    // Vérifier si tous les champs requis sont remplis
    setFormValid(title.trim() !== '' && address.trim() !== '' && (price !== null && !isNaN(price)));
  };

  const validateForm = (): boolean => {
    return (
      title.trim() !== '' &&
      address.trim() !== '' &&
      (price !== null && !isNaN(price))
    );
  };

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setType(event.target.value);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AddHomeOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Publier votre bien
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="title"
                  label="Titre"
                  name="title"
                  autoComplete="title"
                  value={title}
                  onChange={handleInputChange} // Utiliser la fonction handleInputChange pour gérer le changement de la valeur
                />
              </Grid>
              <Grid item xs={12}>
                <AdresMas handleMapChange={handleMapChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="price"
                  label="Prix €"
                  id="price"
                  type='number'
                  value={price === null ? '' : price.toString()} // Display empty string if price is null
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="type-label">Type</InputLabel>
                  <Select
                    labelId="type-label"
                    id="type"
                    value={type || ''}
                    label="Type"
                    onChange={handleTypeChange}
                  >
                    <MenuItem value="maison">Maison</MenuItem>
                    <MenuItem value="appartement">Appartement</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!formValid} // Griser le bouton si le formulaire n'est pas valide
            >
              Publier
            </Button>
          </Box>
        </Box>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}