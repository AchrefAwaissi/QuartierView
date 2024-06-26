const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const SwaggerOptions = require('./swagger/swagger.json');
const swaggerDocument = swaggerJsDoc(SwaggerOptions);
const app = express();
const AnnonceRoutes = require('./routes/Annonce');
const userRoutes = require('./routes/user');

const mongoURI = 'mongodb+srv://root:root@cluster0.xoxfzvh.mongodb.net/';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

// Middleware pour les en-têtes CORS et le parsing du corps de la requête
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes pour les utilisateurs
app.use('/api/auth', userRoutes);

// Routes pour les annonces
app.use('/api', AnnonceRoutes);

module.exports = app;
