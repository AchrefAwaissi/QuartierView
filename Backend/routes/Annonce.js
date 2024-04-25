const express = require('express');
const router = express.Router();
const produitCtrl = require('../controllers/Annonce');

/**
 * @swagger
 * definitions:
 *   Annonce:
 *     type: object
 *     required:
 *       - title
 *       - address
 *       - price
 *       - type
 *     properties:
 *       title:
 *         type: string
 *       address:
 *         type: string
 *       price:
 *         type: number
 *         format: double
 *       type:
 *         type: string
 *         enum:
 *           - maison
 *           - appartement
 */

/**
 * @swagger
 * /annonce/:
 *   post:
 *     description: Ajouter une nouvelle annonce
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Objet Annonce à créer
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Annonce'
 *     responses:
 *       '200':
 *         description: Annonce ajoutée avec succès.
 */
router.post('/annonce', produitCtrl.createAnnonce);

/**
 * @swagger
 * /annonce/{id}:
 *   put:
 *     description: Mettre à jour une annonce par son ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de l'annonce à mettre à jour
 *         required: true
 *         type: string
 *       - in: body
 *         name: body
 *         description: Objet Annonce avec les champs à mettre à jour
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Annonce'
 *     responses:
 *       '200':
 *         description: Annonce mise à jour avec succès.
 */
router.put('/annonce/:id', produitCtrl.updateAnnonce);

/**
 * @swagger
 * /annonce:
 *   get:
 *     description: Récupérer toutes les annonces
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Annonces récupérées avec succès.
 */
router.get('/annonce', produitCtrl.GetAnnonce);

module.exports = router;