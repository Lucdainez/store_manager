const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const {
  BODY_ADD_SALE,
  RESPONSE_SUCCESS_ADD_SALE,
  ALL_SALES,
  REQUEST_SALE_ID_1,
  BODY_UPDATE_SALE,
  REQUEST_UPDATE_SALE,
  BODY_UPDATE_SALE_WITHOUT_PRODUCTID,
  BODY_UPDATE_SALE_WITHOUT_QUANTITY,
  BODY_ADD_SALE_QUANTITY_0,
} = require('./mocks/sales.mock');

const validateSales = require('../../../src/middlewares/validateSales.middleware');

describe('Teste de unidade da camada controller sales', function () {
  afterEach(sinon.restore);

  describe('Teste de casos com requisição bem sucedida', function () {
    it('Adicionar novas vendas', async () => {
      const res = {};
      const req = {
        body: BODY_ADD_SALE,
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'addSalesProducts')
        .resolves({ type: null, message: RESPONSE_SUCCESS_ADD_SALE });
      await salesController.addSales(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(RESPONSE_SUCCESS_ADD_SALE);
    });

    it('Requisitar todas as vendas', async () => {
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'requestAllSales')
        .resolves({ type: null, message: ALL_SALES });
      await salesController.requestAllSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(ALL_SALES);
    });

    it('Requisitar uma venda pelo id', async () => {
      const res = {};
      const req = {
        params: { id: 1 },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'requestSaleId')
        .resolves({ type: 200, message: REQUEST_SALE_ID_1 });
      await salesController.requestSaleId(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(REQUEST_SALE_ID_1);
    });

    it('Deletar uma venda pelo id', async () => {
      const res = {};
      const req = {
        params: { id: 1 },
      };
      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();
      sinon.stub(salesService, 'deleteSale')
        .resolves({ type: null, message: '' });
      await salesController.deleteSale(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });

    it('Alterar uma venda pelo id', async () => {
      const res = {};
      const req = {
        params: { id: 1 },
        body: BODY_UPDATE_SALE,
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'updateSale')
        .resolves({ type: null, message: REQUEST_UPDATE_SALE });
      await salesController.updateSale(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(REQUEST_UPDATE_SALE);
    });

  });

  describe('Teste de casos com requisição mal sucedida', function () {
    it('Falha ao adicionar novas vendas sem "productId"', async () => {
      const res = {};
      const req = {
        body: BODY_UPDATE_SALE_WITHOUT_PRODUCTID,
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const result = await validateSales(BODY_UPDATE_SALE_WITHOUT_PRODUCTID);
      await salesController.addSales(req, res);

      expect(result).to.be.deep.equal(['invalid productId', 'ok']);
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
    });

    it('Falha ao adicionar novas vendas sem "quantity"', async () => {
      const res = {};
      const req = {
        body: BODY_UPDATE_SALE_WITHOUT_QUANTITY,
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      await salesController.addSales(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
    });

    it('Falha ao requisitar uma venda pelo id', async () => {
      const res = {};
      const req = {
        params: { id: 1 },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'requestSaleId')
        .resolves({ type: 404, message: 'Sale not found' });
      await salesController.requestSaleId(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });

    it('Falha ao alterar vendas sem "productId"', async () => {
      const res = {};
      const req = {
        params: { id: 1 },
        body: BODY_UPDATE_SALE_WITHOUT_PRODUCTID,
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const result = await validateSales(BODY_UPDATE_SALE_WITHOUT_PRODUCTID);
      await salesController.updateSale(req, res);

      expect(result).to.be.deep.equal(['invalid productId', 'ok']);
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
    });

    it('Falha ao alterar vendas sem "quantity"', async () => {
      const res = {};
      const req = {
        params: { id: 1 },
        body: BODY_UPDATE_SALE_WITHOUT_QUANTITY,
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const result = await validateSales(BODY_UPDATE_SALE_WITHOUT_QUANTITY);
      await salesController.updateSale(req, res);

      expect(result).to.be.deep.equal(['ok', 'invalid quantity']);
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
    });

    it('Falha ao adicionar nova venda com "quantity = 0"', async () => {
      const res = {};
      const req = {
        body: BODY_ADD_SALE_QUANTITY_0,
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'addSalesProducts')
        .resolves({ type: 422, message: '"quantity" must be greater than or equal to 1' });
      await salesController.addSales(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
    });

    it('Falha ao deletar uma venda pelo id', async () => {
      const res = {};
      const req = {
        params: { id: 999 },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'deleteSale')
        .resolves({ type: 404, message: 'Sale not found' });
      await salesController.deleteSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });

    it('Falha ao alterar uma venda pelo id', async () => {
      const res = {};
      const req = {
        params: { id: 999 },
        body: BODY_UPDATE_SALE,
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'updateSale')
        .resolves({ type: 404, message: 'Sale not found' });
      await salesController.updateSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });

  });
});