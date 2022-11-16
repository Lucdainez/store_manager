const express = require('express');
const salesLayerController = require('../controllers');

const { salesController } = salesLayerController;
const router = express.Router();

router.post('/', salesController.addSales);

router.get('/', salesController.requestAllSales);

router.get('/:id', salesController.requestSaleId);

router.delete('/:id', salesController.deleteSale);

module.exports = router;