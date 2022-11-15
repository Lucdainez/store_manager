const express = require('express');
const salesLayerController = require('../controllers');

const { salesController } = salesLayerController;
const router = express.Router();

router.post('/', salesController.addSales);

module.exports = router;