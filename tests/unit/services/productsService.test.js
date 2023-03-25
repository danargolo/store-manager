const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const { productsService } = require('../../../src/services');
const { mockAllProducts, mockInsert } = require('../mock/mockProducts');


describe('Teste de unidade do services', () => {

  describe('Testes do method GET', () => {
    afterEach(() => sinon.restore());

    it('retorno de todos produtos', async () => {
      sinon.stub(productsModel, 'getAll').resolves([mockAllProducts]);

      const result = await productsService.getAll();

      expect(result.message).to.be.deep.equal(mockAllProducts)
    });

    it('retorno de um produto', async () => {
      sinon.stub(productsModel, 'getById').resolves([[mockAllProducts[0]]]);

      const result = await productsService.getById(1);

      expect(result.message).to.be.deep.equal(mockAllProducts[0])
    })
    it('retorna erro, caso, não encontre o ID', async () => {
      sinon.stub(productsModel, 'getById').resolves([[]]);

      const result = await productsService.getById(10);

      expect(result.type).to.be.equal('PRODUCT NOT FOUND')
      expect(result.message).to.be.deep.equal('Product not found')
    })
  });
  describe('Testes do method POST', () => {
    afterEach(() => sinon.restore());

    it('Verifica retorno ao adicionar um novo produto', async () => {
      sinon.stub(productsModel, 'insertProduct').resolves(mockInsert);

      const result = await productsService.insertProduct('teste');

      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal({ id: 1, name: 'teste' });
    })
  })
});