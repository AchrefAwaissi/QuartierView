import { List, ListItem, IconButton, ListItemText, Container } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
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
        <List >
        {logements.map((logement, index) => (
            <ListItem
            key={index}
            disableGutters
            secondaryAction={
                <IconButton aria-label="comment">
                <HomeOutlinedIcon />
                </IconButton>
            }
    >
            <ListItemText primary={`${logement.title}  - ${logement.address} - ${logement.price}€`} />
            </ListItem>
        ))}
        </List>
    </Container>
  );
}

export default ListeAnnonce;