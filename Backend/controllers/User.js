const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Inscription de l'utilisateur
exports.signup = async (req, res) => {
  try {
    console.log(req.body); // Vérifier si req.body est correctement configuré
    const { email, password } = req.body;

    // Vérification si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    // Hashage du mot de passe
    console.log(password); // Vérifier si password est correct

    // Création d'un nouvel utilisateur
    const newUser = new User({ email, password });
    await newUser.save();

    res.status(201).json({ message: 'Utilisateur créé avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur.' });
  }
};


// Connexion de l'utilisateur
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Recherche de l'utilisateur dans la base de données
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé.' });
    }

    // Vérification du mot de passe
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Mot de passe incorrect.' });
    }

    // Création et envoi du jeton d'authentification
    const token = jwt.sign({ userId: user._id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' });
    res.status(200).json({ userId: user._id, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la connexion de l\'utilisateur.' });
  }
};

// Suppression de l'utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Suppression de l'utilisateur dans la base de données
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur.' });
  }
};

// Mise à jour de l'utilisateur
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = req.body;

    // Mise à jour de l'utilisateur dans la base de données
    const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    res.status(200).json({ message: 'Utilisateur mis à jour avec succès.', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur.' });
  }
};

// Récupération de tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.' });
  }
};
