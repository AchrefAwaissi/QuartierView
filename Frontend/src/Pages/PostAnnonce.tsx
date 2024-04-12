import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AddHomeOutlinedIcon from '@mui/icons-material/AddHomeOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdresMas from '../Components/LocationAPI';
import { TextField } from '@mui/material';

const defaultTheme = createTheme();

export default function Publish() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState<number | null>(null);
  const [formValid, setFormValid] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await insertData(title, address, price);
      setTitle('');
      setAddress('');
      setPrice(null);
      navigate('/ListeAnnonce');
    } catch (error) {
      console.error(error);
    }
  };
  
  const insertData = async (title: string, address: string, price: number | null) => {
    try {
      const response = await axios.post('http://localhost:3000/api/annonce', { title, address, price });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to insert data');
    }
  };

  const handleMapChange = (newAddress: string) => {
    setAddress(newAddress);
    setFormValid(validateForm());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'price') {
      setPrice(value === '' ? null : Number(value));
    }
    setFormValid(title.trim() !== '' && address.trim() !== '' && (price !== null && !isNaN(price)));
  };

  const validateForm = (): boolean => {
    return (
      title.trim() !== '' &&
      address.trim() !== '' &&
      (price !== null && !isNaN(price))
    );
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
                  onChange={handleInputChange}
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
                  value={price === null ? '' : price.toString()}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!formValid}
            >
              Publier
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
