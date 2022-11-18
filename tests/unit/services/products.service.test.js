const { expect } = require('chai');
const sinon = require('sinon');
const productsLayerModel = require('../../../src/models');
const { productsModel } = productsLayerModel;
const { productsService } = require('../../../src/services');
const { findAll, findById, addProduct, setProduct, deleteProduct, searchProductQuery } = productsService;
const { ALL_PRODUCTS, PRODUCT_ID, ADD_NEW_PRODUCT, ALTERED_PRODUCT } = require('./mocks/products.mock');
const { validateNewProduct } = require('../../../src/services/validations/validateProducts');

describe('Testes de unidades da camada service products', function () {
  afterEach(sinon.restore);
  
  describe('Casos de sucesso', function () {
    it('Retorna todos os produtos', async function () {
      sinon.stub(productsModel, 'findAllProducts').resolves(ALL_PRODUCTS);
      const { type, message } = await findAll();
      expect(type).to.deep.equal(null);
      expect(message).to.deep.equal(ALL_PRODUCTS);
    });

    it('Retorna o produto caso ID existente', async function () {
      sinon.stub(productsModel, 'findByProductsId').resolves(PRODUCT_ID);
      const { type, message } = await findById(1);
      expect(type).to.deep.equal(null);
      expect(message).to.deep.equal(PRODUCT_ID);
    });

    it('Retorna um objeto com novo produto e ID', async function () {
      sinon.stub(productsModel, 'insertOneProduct').resolves([{ insertId: 4 }]);
      sinon.stub(productsModel, 'findByProductsId').resolves(ADD_NEW_PRODUCT);
      const { type, message } = await addProduct('produtoX');
      expect(type).to.deep.equal(null);
      expect(message).to.deep.equal(ADD_NEW_PRODUCT);
    });

    it('Alterando um produto', async function () {
      sinon.stub(productsModel, 'updateProduct').resolves(ALTERED_PRODUCT);
      const { type, message } = await setProduct('produtoXs', 4);
      expect(type).to.deep.equal(null);
      expect(message).to.deep.equal(ALTERED_PRODUCT);
    });

    it('Deletando um produto', async function () {
      sinon.stub(productsModel, 'findByProductsId').resolves(PRODUCT_ID);
      const { type, message } = await deleteProduct(1);
      expect(type).to.deep.equal(null);
    });

    it('Requisitando um produto por parâmetro query', async function () {
      sinon.stub(productsModel, 'searchProductQuery').resolves(ALL_PRODUCTS[0]);
      const { type, message } = await searchProductQuery('Martelo');
      expect(type).to.deep.equal(200);
      expect(message).to.deep.equal(ALL_PRODUCTS[0]);
    });
  });

  describe('Casos de falha', function () {
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

    it('retorna erro caso objeto tenha menos de 5 caracteres', async function () {
      sinon.stub(productsModel, 'insertOneProduct').resolves([{ insertId: 4 }]);
      sinon.stub(productsModel, 'findByProductsId').resolves(undefined);
      const { type, message } = await addProduct('prod');
      expect(type).to.deep.equal(422);
      expect(message).to.deep.equal(message);
    });

    it('retorna erro caso name tenha menos de 5 caracteres', async function () {
      await setProduct('prod', 4)
      const { type, message } = validateNewProduct('prod');
      expect(type).to.deep.equal(422);
      expect(message).to.deep.equal(message);
    });

    it('Falha ao alterar um produto', async function () {
      sinon.stub(productsModel, 'updateProduct').resolves('');
      const { type, message } = await setProduct('produt', 4);
      expect(type).to.deep.equal(404);
      expect(message).to.deep.equal(message);
    });

    it('Falha ao deletar um produto', async function () {
      sinon.stub(productsModel, 'findByProductsId').resolves();
      const { type, message } = await deleteProduct(999);
      expect(type).to.deep.equal(404);
      expect(message).to.deep.equal(message);
    });

  });
});