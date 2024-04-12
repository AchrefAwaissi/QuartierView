const Annonce = require('../models/Annonce');

exports.createAnnonce = (req, res, next) => {
  const { title, price, address, type } = req.body;
  const produit = new Annonce({
    title,
    address,
    price,
    type,
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

exports.GetAnnonce = async (req, res, next) => {
  try {
    const annonces = await Annonce.find();
    res.status(200).json(annonces);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


exports.GetAnnonceByVille = async (req, res) => {
  const ville = req.params.ville;
  try {
    const annonces = await Annonce.find({ address: ville });
    res.status(200).json(annonces);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


exports.GetAnnonceByPriceMax = async (req, res) => {
  try {
    const annonces = await Annonce.find({ price: { $lte: req.params.price } });
    res.status(200).json(annonces);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.GetAnnonceByType = async (req, res) => {
  const type = req.params.type;
  try {
    const annonces = await Annonce.find({ type });
    res.status(200).json(annonces);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

