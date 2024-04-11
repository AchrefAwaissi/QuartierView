const express = require('express');
const router = express.Router();
const produitCtrl = require('../controllers/Annonce');


router.post('/annonce',produitCtrl.createAnnonce)
router.put('/annonce/:id',produitCtrl.updateAnnonce)
router.get('/annonce',produitCtrl.GetAnnonce)

module.exports = router;