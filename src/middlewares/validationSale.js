const { productsService } = require('../services');
const salesSchema = require('../schemas/salesSchema');

const handleError = async (error) => {
  if (error) {
    if (error.details[0].type === 'any.required') {
      return { status: 400, message: error.details[0].message };
    }
    if (error.details[0].type === 'number.min') {
      return { status: 422, message: error.details[0].message };
    }
  }
};
const sale = async (req, res, next) => {
  const bodySales = req.body;

  const { error } = salesSchema.validate(bodySales);
  if (error) {
    const { status, message } = await handleError(error);

    return res.status(status).json({ message });
  }
  return next();
};

const saleProductId = async (req, res, next) => {
  const bodySales = req.body;

  const products = await Promise.all(bodySales
    .map((p) => productsService.getById(p.productId)));

  const validateID = products.some((p) => p.type === 'PRODUCT NOT FOUND');

  if (validateID) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return next();
};

module.exports = {
  sale,
  saleProductId,
};