const { expect } = require('chai');
const sinon = require('sinon');
const salesLayerModel = require('../../../src/models/');
const { salesModel, productsModel } = salesLayerModel;
const { salesService } = require('../../../src/services');
const { addSalesProducts, deleteSale, requestAllSales, requestSaleId, updateSale } = salesService;
const {
  ALL_SALES,
  BODY_ADD_SALE, BODY_ADD_SALE_QUANTITY_0,
  BODY_UPDATE_SALE, BODY_UPDATE_SALE_WITHOUT_PRODUCTID,
  BODY_UPDATE_SALE_WITHOUT_QUANTITY,
  REQUEST_SALE_ID_1,
  REQUEST_UPDATE_SALE,
  RESPONSE_SUCCESS_ADD_SALE,
  INSERT_PRODUCT,
  RESPONSE_SUCCESS_ADD_ONE_SALE,
  FIND_PRODUCTS_ID,
  UPDATE_SALE,
  INSERT_PRODUCT_FAIL,
  INSERT_PRODUCTID_FAIL,
} = require('./mocks/sales.mock');

describe('Testes de unidades da camada service sales', function () {
  afterEach(sinon.restore);

  describe('Casos de sucesso', function () {
    it('Adiciona uma nova venda', async function () {
      sinon.stub(salesModel, 'addSalesId').resolves(3);
      sinon.stub(salesModel, 'insertSalesProducts').resolves(3, { productId: 1, quantity: 1 });
      sinon.stub(productsModel, 'findByProductsId').resolves(FIND_PRODUCTS_ID);
      const { type, message } = await addSalesProducts(INSERT_PRODUCT);
      expect(type).to.deep.equal(null);
      expect(message).to.deep.equal(RESPONSE_SUCCESS_ADD_ONE_SALE);
    });

    it('Retorna todas as vendas', async function () {
      sinon.stub(salesModel, 'requestAllSales').resolves(ALL_SALES);
      const { type, message } = await requestAllSales();
      expect(type).to.deep.equal(null);
      expect(message).to.deep.equal(ALL_SALES);
    });

    it('Retorna uma venda pelo ID', async function () {
      sinon.stub(salesModel, 'requestSaleId').resolves(REQUEST_SALE_ID_1);
      const { type, message } = await requestSaleId(1);
      expect(type).to.deep.equal(200);
      expect(message).to.deep.equal(REQUEST_SALE_ID_1);
    });

    it('Deletar uma venda pelo ID', async function () {
      sinon.stub(salesModel, 'requestSaleId').resolves(REQUEST_SALE_ID_1);
      sinon.stub(salesModel, 'deleteSale').resolves();
      const { type} = await deleteSale(1);
      expect(type).to.deep.equal(204);
    });

    it('Alterar uma venda', async function () {
      sinon.stub(salesModel, 'requestSaleId').resolves(1);
      sinon.stub(productsModel, 'findByProductsId').resolves(FIND_PRODUCTS_ID);
      sinon.stub(salesModel, 'updateSale').resolves(1, 1, 1);
      const { type, message } = await updateSale(1, INSERT_PRODUCT);
      expect(type).to.deep.equal(null);
      expect(message).to.deep.equal(UPDATE_SALE);
    });
  });

  describe('Casos de falha', function () {
    it('Falha ao alterar uma venda com quantity igual a 0', async function () {
      sinon.stub(salesModel, 'requestSaleId').resolves(1);
      sinon.stub(productsModel, 'findByProductsId').resolves(FIND_PRODUCTS_ID);
      sinon.stub(salesModel, 'updateSale').resolves(1, 1, 1);
      const { type, message } = await updateSale(1, INSERT_PRODUCT_FAIL);
      expect(type).to.deep.equal(422);
      expect(message).to.deep.equal('"quantity" must be greater than or equal to 1');
    });

    it('Falha ao adicionar uma nova venda com quantity igual a 0', async function () {
      sinon.stub(salesModel, 'addSalesId').resolves(3);
      sinon.stub(salesModel, 'insertSalesProducts').resolves(3, { productId: 1, quantity: 1 });
      sinon.stub(productsModel, 'findByProductsId').resolves(FIND_PRODUCTS_ID);
      const { type, message } = await addSalesProducts(INSERT_PRODUCT_FAIL);
      expect(type).to.deep.equal(422);
      expect(message).to.deep.equal('"quantity" must be greater than or equal to 1');
    });

    it('Falha ao adicionar uma nova venda com productId igual a 0', async function () {
      sinon.stub(salesModel, 'addSalesId').resolves(3);
      sinon.stub(salesModel, 'insertSalesProducts').resolves(3, { productId: 0, quantity: 1 });
      sinon.stub(productsModel, 'findByProductsId').resolves(undefined);
      const { type, message } = await addSalesProducts(INSERT_PRODUCTID_FAIL);
      expect(type).to.deep.equal(404);
      expect(message).to.deep.equal('Product not found');
    });
    
    it('Falha ao adicionar uma nova venda com productId igual a 0', async function () {
      sinon.stub(salesModel, 'requestSaleId').resolves([]);
      const { type, message } = await requestSaleId(999);
      expect(type).to.deep.equal(404);
      expect(message).to.deep.equal('Sale not found');
    });

    it('Falha ao deletar uma venda com id inválido', async function () {
      sinon.stub(salesModel, 'requestSaleId').resolves([]);
      const { type, message } = await deleteSale(999);
      expect(type).to.deep.equal(404);
      expect(message).to.deep.equal('Sale not found');
    });

    it('Falha ao alterar uma venda com Id inválido', async function () {
      sinon.stub(salesModel, 'requestSaleId').resolves([]);
      const { type, message } = await updateSale(999);
      expect(type).to.deep.equal(404);
      expect(message).to.deep.equal('Sale not found');
    });

    it('Falha ao alterar uma venda com Id inválido', async function () {
      sinon.stub(salesModel, 'requestSaleId').resolves(REQUEST_SALE_ID_1);
      sinon.stub(productsModel, 'findByProductsId').resolves(undefined);
      const { type, message } = await updateSale(1, INSERT_PRODUCTID_FAIL);
      expect(type).to.deep.equal(404);
      expect(message).to.deep.equal('Product not found');
    });

  });

});