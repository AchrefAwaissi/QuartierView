const Annonce = require('../models/Annonce');

exports.createAnnonce = (req, res, next) => {
  const { title, price, address } = req.body;
  const produit = new Annonce({
    title,
    address,
    price,
  });
  produit.save()
    .then(() => {
      res.status(201).json({ message: 'Bravo annonce postée' });
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
};

