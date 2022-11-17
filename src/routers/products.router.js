const express = require('express');
const productsLayerController = require('../controllers');
const validateNameMiddleware = require('../middlewares/validateName.middleware');

const { productsController } = productsLayerController;

const router = express.Router();

router.get('/', productsController.listProducts);

router.get('/search', productsController.searchProductQuery);

router.put('/:id', validateNameMiddleware, productsController.setProduct);

router.get('/:id', productsController.getProductId);

router.post('/', validateNameMiddleware, productsController.addProduct);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;