const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models/index');
const connection = require('../../../src/models/connection');
const { ALL_PRODUCTS, PRODUCT_ID, ALTERED_PRODUCT } = require('./mocks/products.mock');

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

  it('adicionando um produto', async function () {
    sinon.stub(connection, 'execute').resolves([{insertId: 4}]);
    const result = await productsModel.insertOneProduct('produtoX')
    expect(result).to.equal(4);
  });

  it('alterando um produto', async function () {
    sinon.stub(connection, 'execute').resolves([[ALTERED_PRODUCT]]);
    const result = await productsModel.updateProduct('produtoX')
    expect(result).to.be.deep.equal(ALTERED_PRODUCT);
  });

  it('Deletando um produto', async function () {
    sinon.stub(connection, 'execute').resolves();
    const result = await productsModel.deleteProduct(1)
    expect(result).to.be.deep.equal();
  });

  it('Busca de produto por parâmetro query sem valor', async function () {
    sinon.stub(connection, 'execute').resolves([ALL_PRODUCTS]);
    const result = await productsModel.searchProductQuery()
    expect(result).to.be.deep.equal(ALL_PRODUCTS);
  });

  it('Busca de produto por parâmetro query com valor', async function () {
    sinon.stub(connection, 'execute').resolves([ALL_PRODUCTS[0]]);
    const result = await productsModel.searchProductQuery('Martelo')
    expect(result).to.be.deep.equal(ALL_PRODUCTS[0]);
  });

});