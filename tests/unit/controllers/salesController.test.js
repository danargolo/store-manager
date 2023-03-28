const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { produtsController, salesController } = require('../../../src/controllers');

const { productsService, salesService } = require('../../../src/services');
const { mockAllProducts, mockInsertProduct, mockUpdateProduct } = require('../mock/mockProducts');
const { mockAllSales, mockSale, mockInsertSale } = require('../mock/mockSales');


describe('Teste de unidade do controllers para Sales', () => {

  describe('Testes do method GET', () => {
    afterEach(() => sinon.restore());

    it('retorno de todas as vendas', async () => {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'getAll').resolves(mockAllSales);

      await salesController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200)
      expect(res.json).to.have.been.calledWith(mockAllSales)
    });

    it('retorno de uma venda', async () => {
      const res = {};
      const req = {
        params: {
          id: 1,
        }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'getById').resolves({ message: [mockSale[0]] });

      await salesController.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([mockSale[0]]);
    });
    it('retorna erro, caso, não encontre o ID', async () => {
      const res = {};
      const req = {
        params: {
          id: 50,
        }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'getById').resolves({ type: 'PRODUCT NOT FOUND', message: 'Product not found' });

      await salesController.getById(req, res);

      expect(res.status).to.have.been.calledWith(404)
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' })
    });
  });
  describe('Testes do method POST', () => {
    afterEach(() => sinon.restore());

    it('Verifica retorno ao adicionar uma nova venda', async () => {
      const res = {};
      const req = {
        body: {
          name: "Chave de Fenda Sônica",
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'insertSale').resolves(mockInsertSale);

      await salesController.insertSale(req, res);
      
      expect(res.status).to.be.have.been.calledWith(201)
      expect(res.json).to.be.have.been.calledWith({
        id: 3,
        itemsSold: [
          {
            productId: 1,
            quantity: 10
          },
          {
            productId: 2,
            quantity: 50
          }]
      });
    })
    
  })
  // describe('Testes do method PUT', () => {
  //   afterEach(() => sinon.restore());

  //   it('Verifica retorno ao alterar produto existente', async () => {
  //     const res = {};
  //     const req = {
  //       params: {
  //         id: 2
  //       },
  //       body: {
  //         name: "Talisma do Porco",
  //       },
  //     };

  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns();
  //     sinon.stub(productsService, 'getById').resolves({type:null, message:''})
  //     sinon.stub(productsService, 'updateProduct').resolves({ id: 2, name: 'Talisma do Porco' });

  //     await produtsController.updateProduct(req, res);
      
  //     expect(res.status).to.be.have.been.calledWith(200)
  //     expect(res.json).to.be.have.been.calledWith({ id: 2, name: 'Talisma do Porco' });
  //   })
  //   it('Verifica retorno ao tentar alterar produto inexistente', async () => {
  //     const res = { };
  //     const req = {
  //       params: {
  //         id: 10
  //       },
  //       body: {
  //         name: "Talisma do Porco",
  //       },
  //     };

  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns();
  //     sinon.stub(productsService, 'getById').resolves({ type: 'PRODUCT NOT FOUND', message: 'Product not found' });

  //     await produtsController.updateProduct(req, res);
      
  //     expect(res.status).to.be.have.been.calledWith(404)
  //     expect(res.json).to.be.have.been.calledWith({ message: 'Product not found' });
  //   })
  // })
});