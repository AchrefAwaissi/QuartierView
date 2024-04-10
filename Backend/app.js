const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const AnnonceRoutes = require('./routes/Annonce');

const userRoutes = require('./routes/user');
//mongo db connection
const mongoURI = 'Met ta base ilies et fffff.......lllllaa';
console.log(mongoURI)

// Connecter à MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  
app.use(bodyParser.json());
app.use('/api/auth', userRoutes);
app.use('/api/annonce', AnnonceRoutes);
module.exports = app;