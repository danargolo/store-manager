const mockAllSales = [
  [{
    "saleId": 1,
    "date": "2023-03-28T05:33:23.000Z",
    "productId": 1,
    "quantity": 5
  },
    {
      "saleId": 1,
      "date": "2023-03-28T05:33:23.000Z",
      "productId": 2,
      "quantity": 10
    },
    {
      "saleId": 2,
      "date": "2023-03-28T05:33:23.000Z",
      "productId": 3,
      "quantity": 15
    }]
];

const mockSale = [
  [{
    "date": "2023-03-28T05:33:23.000Z",
    "productId": 1,
    "quantity": 2
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

const mockInsertSale = {
  type: null,
  message: {
    id: 3,
    itemsSold: [{ productId: 1, quantity: 10 }, { productId: 2, quantity: 50 }]
  }
};

module.exports = {
  mockAllSales,
  mockSale,
  mockInsertSale,
  mockInsert,
}