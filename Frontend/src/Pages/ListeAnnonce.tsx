import { Card, CardActions, CardContent, Typography, Button, CardMedia, Container } from '@mui/material';
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
        <Container>
            {logements.map((logement, index) => (
                <Card key={index} sx={{ maxWidth: 345, margin: '20px auto' }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {logement.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {logement.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {logement.address} - {logement.price}€
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Voir plus</Button>
                    </CardActions>
                </Card>
            ))}
        </Container>
    );
}

export default ListeAnnonce;
