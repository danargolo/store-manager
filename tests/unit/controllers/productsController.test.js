const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { productsController } = require('../../../src/controllers');

const { productsService } = require('../../../src/services');
const { mockAllProducts, mockInsertProduct, mockInsert } = require('../mock/mockProducts');


describe('Teste de unidade do controllers para Products', () => {

  describe('Testes do method GET', () => {
    afterEach(() => sinon.restore());

    it('retorno de todos produtos', async () => {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'getAll').resolves(mockAllProducts);

      await productsController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200)
      expect(res.json).to.have.been.calledWith(mockAllProducts)
    });

    it('retorno de um produto', async () => {
      const res = {};
      const req = {
        params: {
          id: 1,
        }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'getById').resolves({ message: [mockAllProducts[0]] });

      await productsController.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([mockAllProducts[0]]);
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

      sinon.stub(productsService, 'getById').resolves({ type: 'PRODUCT NOT FOUND', message: 'Product not found' });

      await productsController.getById(req, res);

      expect(res.status).to.have.been.calledWith(404)
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' })
    });
  });
  describe('Testes do method POST', () => {
    afterEach(() => sinon.restore());

    it('Verifica retorno ao adicionar um novo produto', async () => {
      const res = {};
      const req = {
        body: {
          name: "Chave de Fenda Sônica",
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'insertProduct').resolves(mockInsertProduct);

      await productsController.insertProduct(req, res);
      
      expect(res.status).to.be.have.been.calledWith(201)
      expect(res.json).to.be.have.been.calledWith({ id: 1, name: "Chave de Fenda Sônica" });
    })
    
  })
  describe('Testes do method PUT', () => {
    afterEach(() => sinon.restore());

    it('Verifica retorno ao alterar produto existente', async () => {
      const res = {};
      const req = {
        params: {
          id: 2
        },
        body: {
          name: "Talisma do Porco",
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getById').resolves({type:null, message:''})
      sinon.stub(productsService, 'updateProduct').resolves({ id: 2, name: 'Talisma do Porco' });

      await productsController.updateProduct(req, res);
      
      expect(res.status).to.be.have.been.calledWith(200)
      expect(res.json).to.be.have.been.calledWith({ id: 2, name: 'Talisma do Porco' });
    })
    it('Verifica retorno ao tentar alterar produto inexistente', async () => {
      const res = { };
      const req = {
        params: {
          id: 10
        },
        body: {
          name: "Talisma do Porco",
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getById').resolves({ type: 'PRODUCT NOT FOUND', message: 'Product not found' });

      await productsController.updateProduct(req, res);
      
      expect(res.status).to.be.have.been.calledWith(404)
      expect(res.json).to.be.have.been.calledWith({ message: 'Product not found' });
    })
  })
  describe('Testes do method DELETE', () => {
    afterEach(() => sinon.restore());

    it('Verifica se é possivel deletar um produto', async () => {
      const res = {};
      const req = {
        params: {
          id: 1
        }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'getById').resolves({ type: null, message: '' });
      sinon.stub(productsService, 'deleteProduct').resolves(mockInsert);

      await productsController.deleteProduct(req, res);

      expect(res.status).to.be.have.been.calledWith(204)
    })
    it('Verifica retorno ao tentar alterar produto inexistente', async () => {
      const res = {};
      const req = {
        params: {
          id: 10
        }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getById').resolves({ type: 'PRODUCT NOT FOUND', message: 'Product not found' });

      await productsController.deleteProduct(req, res);

      expect(res.status).to.be.have.been.calledWith(404)
      expect(res.json).to.be.have.been.calledWith({ message: 'Product not found' });
    })
  })
});