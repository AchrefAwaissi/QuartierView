// Importer mongoose
const mongoose = require('mongoose');

// Package pour vérifié que l'email n'est pas déjà enregistré

// Structure du schéma user
const userSchema = mongoose.Schema({
  email: { type: String, required: true},
  password: { type: String, required: true }
});


module.exports = mongoose.model('User', userSchema);