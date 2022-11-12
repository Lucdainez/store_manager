const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { ALL_PRODUCTS, PRODUCT_ID } = require('./mocks/products.mock');

describe('Teste de unidade da camada controller products', function () {
  afterEach(sinon.restore);

  describe('Teste de casos com requisição bem sucedida', function () {
  
    it('Requisitando todos os produtos', async function () {
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'findAll')
        .resolves({ type: null, message: ALL_PRODUCTS });
    
      await productsController.listProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(ALL_PRODUCTS);
    });

    it('Requisitando um produto de ID específico', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'findById')
        .resolves({ type: null, message: PRODUCT_ID });

      await productsController.getProductId(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(PRODUCT_ID);
    });
  });

  describe('Teste de casos com requisição mal sucedida', function () { 
    it('Requisitando um produto de ID inexistente', async function () { 
      const res = {};
      const req = {
        params: { id: 4 },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'findById')
        .resolves({ type: 404, message: 'Product not found' });

      await productsController.getProductId(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    it('Falha ao requisitar todos os produtos', async function () {
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'findAll')
        .resolves({ type: 404, message: 'error' });

      await productsController.listProducts(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'error' });
    });
  
  })
});