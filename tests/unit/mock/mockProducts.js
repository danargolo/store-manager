const mockAllProducts = [
  [{
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
    }]
];
const mockInsert = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 1,
    info: '',
    serverStatus: 2,
    warningStatus: 0
  },
  undefined
];

const mockInsertProduct = {
  type: null,
  message: {
    "id": 1,
    "name": "Chave de Fenda Sônica"
  }
};
  




module.exports = {
  mockAllProducts,
  mockInsertProduct,
  mockInsert,
}