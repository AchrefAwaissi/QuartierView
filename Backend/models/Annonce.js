// Importer mongoose
const mongoose = require('mongoose');

const Annonceschema = mongoose.Schema({
    title: {type: String, required: true},
    address: {type: String, required: true},
    price: {type: Number, required: true},
    type: {type: String, required: true},
});

module.exports = mongoose.model('Annonce', Annonceschema );