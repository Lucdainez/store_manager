const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { ALL_PRODUCTS, PRODUCT_ID, ADD_NEW_PRODUCT } = require('./mocks/products.mock');

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

    it('Adicionar produto novo', async function () {
      const res = {};
      const req = {
        body: { name: 'produtoX' },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'addProduct')
        .resolves({ type: null, message: ADD_NEW_PRODUCT });

      await productsController.addProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(ADD_NEW_PRODUCT);
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

    it('Falha ao adicionar produto novo', async function () {
      const res = {};
      const req = {
        body: { name: 'pr' },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'addProduct')
        .resolves({ type: 422, message: "\"name\" length must be at least 5 characters long" });

      await productsController.addProduct(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    });
  
  })
});