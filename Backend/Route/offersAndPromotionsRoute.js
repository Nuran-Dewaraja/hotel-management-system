const express = require('express');
const router = express.Router();
const offersAndPromotionsModel = require('../Model/offersAndPromotionsModel');
const offersAndPromotionsController = require('../Controlers/offersAndPromotionsControlers');


router.get('/', offersAndPromotionsController.getPromotions);
router.get('/:id', offersAndPromotionsController.getPromotionById) 
router.post('/', offersAndPromotionsController.addPromotions);
router.put('/:id', offersAndPromotionsController.updatePromotion);
router.delete('/:id', offersAndPromotionsController.deletePromotion);


module.exports = router;   