const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { mockAllSales, mockSale, mockInsert } = require('../mock/mockSales');

describe('Teste de unidade do models para Sales', () => { 
  
  describe('Testes do method GET', () => {
    afterEach(() => sinon.restore());

    it('retorno de todas vendas', async () => {
      sinon.stub(connection, 'execute').resolves([mockAllSales]);
      
      const [result] = await salesModel.getAll();
      
      expect(result).to.be.deep.equal(mockAllSales)
    });
  
    it('retorno de uma venda', async () => {
      sinon.stub(connection, 'execute').resolves([mockSale]);
      
      const [result] = await salesModel.getById(1);
        
      expect(result).to.be.deep.equal(mockSale)
    })
  });
  describe('Testes do method POST', () => {
    afterEach(() => sinon.restore());

    it('Verifica retorno ao adicionar uma nova venda', async () => {
      sinon.stub(connection, 'execute').resolves(mockInsert);

      const result = await salesModel.insertSale();
      expect(result[0].insertId).to.be.equal(1);
    })
  })
});