const express = require('express');
const productsLayerController = require('../controllers');
const validateNameMiddleware = require('../middlewares/validateName.middleware');

const { productsController } = productsLayerController;

const router = express.Router();

router.get('/', productsController.listProducts);

router.put('/:id', validateNameMiddleware, productsController.setProduct);

router.get('/:id', productsController.getProductId);

router.post('/', validateNameMiddleware, productsController.addProduct);

module.exports = router;