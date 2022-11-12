const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models/index');
const connection = require('../../../src/models/connection');
const { ALL_PRODUCTS, PRODUCT_ID } = require('./mocks/products.mock');

describe('Testes de unidades da camada model products', function () {
  afterEach(sinon.restore);

  it('Recuperando todos os produtos',async function () {
    sinon.stub(connection, 'execute').resolves([ALL_PRODUCTS]);
    const result = await productsModel.findAllProducts();
    expect(result).to.be.deep.equal(ALL_PRODUCTS);
  });

  it('Recuperando um produto a partir do id', async function () {
    sinon.stub(connection, 'execute').resolves([[PRODUCT_ID]]);
    const result = await productsModel.findByProductsId(1);
    expect(result).to.be.deep.equal(PRODUCT_ID);
  });
});

