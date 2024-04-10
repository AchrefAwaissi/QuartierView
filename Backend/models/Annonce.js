// Importer mongoose
const mongoose = require('mongoose');

// Structure du schéma Commande
const Annonceschema = mongoose.Schema({
    title: {type: String, required: false},
    address: {type: String, required: false},
    price: {type: Number, required: false},
});

module.exports = mongoose.model('Annonce', Annonceschema );