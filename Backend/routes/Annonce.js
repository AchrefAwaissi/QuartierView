const express = require('express');
const router = express.Router();
const produitCtrl = require('../controllers/Annonce');


router.post('/add-annonce',produitCtrl.createAnnonce)
router.put('/update-annonce/:id',produitCtrl.updateAnnonce)

module.exports = router;