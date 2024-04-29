import React, { useState } from 'react';
import { Grid, TextField, Button, Typography, Card, CardContent, Checkbox } from '@mui/material';
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
  const [isMaisonChecked, setIsMaisonChecked] = useState(true); // État pour la case à cocher maison
  const [isAppartementChecked, setIsAppartementChecked] = useState(true); // État pour la case à cocher appartement

  const handleSearch = async () => {
    try {
      let apiUrl = 'http://localhost:3000/api/annonce';

      // Construire la requête API en fonction des filtres
      let params = [];
      if (ville) params.push(`address=${encodeURIComponent(ville)}`);
      if (prixMax) params.push(`maxPrice=${encodeURIComponent(prixMax)}`);
      if (isMaisonChecked) params.push('type=maison');
      if (isAppartementChecked) params.push('type=appartement');
      if (params.length > 0) apiUrl += `?${params.join('&')}`
      else apiUrl += '/';

      const response = await axios.get(apiUrl);
      let filteredResults = response.data;

      if (ville || prixMax || !isMaisonChecked || !isAppartementChecked) {
        if (ville) filteredResults = filteredResults.filter((logement: any) => logement.address === ville);
        if (prixMax) filteredResults = filteredResults.filter((logement: any) => logement.price <= prixMax);
        if (!isMaisonChecked) filteredResults = filteredResults.filter((logement: any) => logement.type !== 'maison');
        if (!isAppartementChecked) filteredResults = filteredResults.filter((logement: any) => logement.type !== 'appartement');
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
            <Grid item xs={12} sm={6}>
              <Checkbox checked={isMaisonChecked} onChange={(e) => setIsMaisonChecked(e.target.checked)} /> Maison
            </Grid>
            <Grid item xs={12} sm={6}>
              <Checkbox checked={isAppartementChecked} onChange={(e) => setIsAppartementChecked(e.target.checked)} /> Appartement
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
