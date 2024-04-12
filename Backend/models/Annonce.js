// Importer mongoose
const mongoose = require('mongoose');

// Structure du schéma Commande
const Annonceschema = mongoose.Schema({
    title: {type: String, required: true},
    address: {type: String, required: true},
    price: {type: Number, required: true},
});

module.exports = mongoose.model('Annonce', Annonceschema );