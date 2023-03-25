const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { mockAllProducts, mockInsert } = require('../mock/mockProducts');

describe('Teste de unidade do models', () => { 
  
  describe('Testes do method GET', () => {
    afterEach(() => sinon.restore());

    it('retorno de todos produtos', async () => {
      sinon.stub(connection, 'execute').resolves([mockAllProducts]);
      
      const [result] = await productsModel.getAll();
      
      expect(result).to.be.deep.equal(mockAllProducts)
    });
  
    it('retorno de um produto', async () => {
      sinon.stub(connection, 'execute').resolves([[mockAllProducts[0]]]);
      
      const [[result]] = await productsModel.getById(1);
        
      expect(result).to.be.deep.equal(mockAllProducts[0])
    })
  });
  describe('Testes do method POST', () => {
    afterEach(() => sinon.restore());

    it('Verifica retorno ao adicionar um novo produto', async () => {
      sinon.stub(connection, 'execute').resolves(mockInsert);

      const result = await productsModel.insertProduct('teste');
      expect(result[0].insertId).to.be.equal(1);
    })
  })
});