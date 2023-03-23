const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { mockAllProducts, mockProduct } = require('./mock/mockProducts');

describe('Teste de unidade do models', () => { 
  afterEach(() => sinon.restore());

  it('retorno de todos produtos', async () => {
    sinon.stub(connection, 'execute').resolves([mockAllProducts]);
    
    const result = await productsModel.getAll();
    
    expect(result).to.be.deep.equal(mockAllProducts)
  });

  it('retorno de um produto', async () => {
    sinon.stub(connection, 'execute').resolves([mockProduct]);
    
    const [result] = await productsModel.getById(1);
    console.log(result[0]);
    
    expect(result).to.be.deep.equal(mockProduct)
  })
});