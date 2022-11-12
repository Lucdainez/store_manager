const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/products.model');
const { productsService } = require('../../../src/services');
const { findAll, findById, addProduct } = productsService;
const { ALL_PRODUCTS, PRODUCT_ID, ADD_NEW_PRODUCT } = require('./mocks/products.mock');

describe('Testes de unidades da camada service products', function () {
  afterEach(sinon.restore);
  
  describe('listagem de produtos', function () {
    it('retorna todos os produtos', async function () {
      sinon.stub(productsModel, 'findAllProducts').resolves(ALL_PRODUCTS);
      const { type, message } = await findAll();
      expect(type).to.deep.equal(null);
      expect(message).to.deep.equal(ALL_PRODUCTS);
    });
  });

  describe('busca de um produto', function () {
    it('retorna um erro caso receba um ID inválido', async function () {
      const { type, message } = await findById(0);
      expect(type).to.deep.equal('INPUT_ID');
      expect(message).to.deep.equal('"id" must be a number');
    });

    it('retorna um erro caso o produto não seja encontrado', async function () {
      sinon.stub(productsModel, 'findByProductsId').resolves(undefined);
      const { type, message } = await findById(1);
      expect(type).to.deep.equal(404);
      expect(message).to.deep.equal('Product not found');
    });

    it('retorna o produto caso ID existente', async function () {
      sinon.stub(productsModel, 'findByProductsId').resolves(PRODUCT_ID);
      const { type, message } = await findById(1);
      expect(type).to.deep.equal(null);
      expect(message).to.deep.equal(PRODUCT_ID);
    });

    it('retorna um objeto com novo produto e ID', async function () {
      sinon.stub(productsModel, 'insertOneProduct').resolves([{ insertId: 4 }]);
      sinon.stub(productsModel, 'findByProductsId').resolves(ADD_NEW_PRODUCT);
      const { type, message } = await addProduct('produtoX');
      expect(type).to.deep.equal(null);
      expect(message).to.deep.equal(ADD_NEW_PRODUCT);
    });

    it('retorna erro caso objeto tenha menos de 5 caracteres', async function () {
      sinon.stub(productsModel, 'insertOneProduct').resolves([{ insertId: 4 }]);
      sinon.stub(productsModel, 'findByProductsId').resolves(undefined);
      const { type, message } = await addProduct('prod');
      expect(type).to.deep.equal(422);
      expect(message).to.deep.equal(message);
    });

  });
});
