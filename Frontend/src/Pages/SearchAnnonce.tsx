import React, { useState } from 'react';
import { Grid, TextField, Button, Typography, Card, CardContent } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';

const Container = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  });
  
  const StyledCard = styled(Card)({
    maxWidth: 400,
  });
  
  const CenteredTypography = styled(Typography)({
    textAlign: 'center',
  });
  
  const ErrorMessage = styled(Typography)({
    color: 'red',
    textAlign: 'center',
    marginTop: '10px',
  });
  
  const DataDisplay = styled('div')({
    marginTop: '10px',
  });

const SearchAnnonce = () => {
    const [ville, setVille] = useState('');
    const [prixMax, setPrixMax] = useState('');
    const [logements, setLogements] = useState([]);
    const [error, setError] = useState<string | null>(null);
    const [responseData, setResponseData] = useState<any>(null);
  
    const handleSearch = async () => {
      try {
        let apiUrl = 'http://localhost:3000/api/logements';
  
        if (ville && prixMax) {
          apiUrl += `?ville=${encodeURIComponent(ville)}&price=${encodeURIComponent(prixMax)}`;
        } else if (ville) {
          apiUrl += `/ville/${encodeURIComponent(ville)}`;
        } else if (prixMax) {
          apiUrl += `/price/${encodeURIComponent(prixMax)}`;
        }
  
        const response = await axios.get(apiUrl);
        let filteredResults = response.data;
    
        if (ville && prixMax) {
          filteredResults = filteredResults.filter((logement: any) => logement.address === ville && logement.price <= prixMax);
        } else if (ville) {
          filteredResults = filteredResults.filter((logement: any) => logement.address === ville);
        } else if (prixMax) {
          filteredResults = filteredResults.filter((logement: any) => logement.price <= prixMax);
        }
    
        if (filteredResults.length > 0) {
          setLogements(filteredResults);
          setError(null);
          setResponseData(filteredResults);
        } else {
          setError('No results found');
          setResponseData(null);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Erreur lors de la récupération des données');
        setResponseData(null);
      };
  
    }
  
    return (
      <Container>
        <StyledCard>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <CenteredTypography variant="h5">Trouvez votre bien</CenteredTypography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Dans quelle ville ? Quartier ?"
                  value={ville}
                  onChange={(e) => setVille(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Votre budget max ?"
                  value={prixMax}
                  onChange={(e) => setPrixMax(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" fullWidth onClick={handleSearch}>
                  Rechercher
                </Button>
              </Grid>
              {error && (
                <Grid item xs={12}>
                  <ErrorMessage>{error}</ErrorMessage>
                </Grid>
              )}
              
              {responseData && (
                <Grid item xs={12}>
                  <DataDisplay>
                    {responseData.map((logement: any) => (
                      <div key={logement._id}>
                        <Typography variant="subtitle1">Title: {logement.title}</Typography>
                        <Typography variant="subtitle1">Address: {logement.address}</Typography>
                        <Typography variant="subtitle1">Price: {logement.price}</Typography>
                        <hr />
                      </div>
                    ))}
                  </DataDisplay>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </StyledCard>
      </Container>
    );
  };
  
  export default SearchAnnonce;