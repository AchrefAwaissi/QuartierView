import { Card, CardActions, CardContent, Typography, Button, CardMedia, Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ListeAnnonce = () => {
    const [logements, setLogements] = useState<any[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/annonce')
            .then(response => {
                setLogements(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);
    return (
        <Container maxWidth="lg" style={{ marginTop: '30px' }}>  
            <Grid container spacing={2}> 
                {logements.map((logement, index) => (
                    <Grid item xs={12} sm={4} md={4} lg={4} key={index}>  
                        <Card sx={{ maxWidth: 345 }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {logement.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {logement.description}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {logement.address} 
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                {logement.price}€
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Voir plus de details </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default ListeAnnonce;