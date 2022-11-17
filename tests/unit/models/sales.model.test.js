const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models/index');
const connection = require('../../../src/models/connection');
const { ALL_SALES, REQUEST_SALE_ID_1} = require('./mocks/sales.mock');

describe('Testes de unidades da camada model sales', function () {
  afterEach(sinon.restore);

  it('Adicionar novo id de vendas', async function () {
    sinon.stub(connection, 'execute').resolves([{insertId: 3}]);
    const result = await salesModel.addSalesId(3);
    expect(result).to.be.deep.equal(3);
  });

  it('Adicionar novas vendas', async function () {
    sinon.stub(connection, 'execute').resolves();
    const result = await salesModel.insertSalesProducts(3, {productId: 1, quantity: 10 });
    expect(result).to.be.deep.equal();
  });

  it('Consultar todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([ALL_SALES]);
    const result = await salesModel.requestAllSales();
    expect(result).to.be.deep.equal(ALL_SALES);
  });

  it('Consultar uma venda pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([REQUEST_SALE_ID_1]);
    const result = await salesModel.requestSaleId(1);
    expect(result).to.be.deep.equal(REQUEST_SALE_ID_1);
  });

  it('Deletar uma venda pelo id', async function () {
    sinon.stub(connection, 'execute').resolves();
    const result = await salesModel.deleteSale(1);
    expect(result).to.be.deep.equal();
  });

  it('Alterar uma venda pelo id', async function () {
    sinon.stub(connection, 'execute').resolves();
    const result = await salesModel.updateSale(1, 10, 1);
    expect(result).to.be.deep.equal();
  });

});