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
exports.updateAnnonce = async (req, res) => {
  try {
    const updatedAnnonce = await Annonce.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true } 
    );
    if (!updatedAnnonce) {
      return res.status(404).json({ message: "Annonce non trouvée" });
    }
    res.status(200).json({ message: "Annonce modifiée avec succès", updatedAnnonce });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
