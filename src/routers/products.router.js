const express = require('express');
const productsLayerController = require('../controllers');

const { productsController } = productsLayerController;

const router = express.Router();

router.get('/', productsController.listProducts);

router.get('/:id', productsController.getProductId);

module.exports = router;