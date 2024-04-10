const express = require('express');
const router = express.Router();
const produitCtrl = require('../controllers/Annonce');


router.post('/add-produit',produitCtrl.createAnnonce)

module.exports = router;