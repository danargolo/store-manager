const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { mockAllSales, mockSale, mockInsert } = require('../mock/mockSales');


describe('Teste de unidade do services para Sales', () => {

  describe('Testes do method GET', () => {
    afterEach(() => sinon.restore());

    it('retorno de todas as vendas', async () => {
      sinon.stub(salesModel, 'getAll').resolves(mockAllSales);

      const result = await salesService.getAll();

      expect(result).to.be.deep.equal(mockAllSales[0])
    });

    it('retorno de uma venda', async () => {
      sinon.stub(salesModel, 'getById').resolves(mockSale);

      const result = await salesService.getById(1);

      expect(result.message).to.be.equal(mockSale[0])
    })
    it('retorna erro, caso, não encontre o ID', async () => {
      sinon.stub(salesModel, 'getById').resolves([[]]);

      const result = await salesService.getById(50);

      expect(result.type).to.be.equal('SALE NOT FOUND');
      expect(result.message).to.be.deep.equal('Sale not found');
    })
  });
  describe('Testes do method POST', () => {
    afterEach(() => sinon.restore());

    it('Verifica retorno ao adicionar uma nova venda', async () => {
      sinon.stub(salesModel, 'insertSale').resolves(mockInsert);
      sinon.stub(salesModel, 'insertSaleProducts').resolves({
        "productId": 1,
        "quantity": 1
      });

      const result = await salesService.insertSale({
        "productId": 1,
        "quantity": 1
      });

      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal({
        id: 1,
        itemsSold: {
          "productId": 1,
          "quantity": 1
        }
      });
    })
  })
});