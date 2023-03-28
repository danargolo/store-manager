const { productSchema } = require('../schemas/productSchema');

const product = (req, res, next) => {
  const { name } = req.body;
  const { error } = productSchema.validate(name);

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }

  if (error) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  return next();
};

// const productId = async (req, res, next) => {
//   const body = req.body;

//   const products = await Promise.all(body
//     .map((p) => productsService.getById(p.productId)));

//   const validateID = products.some((p) => p.type === 'PRODUCT NOT FOUND');

//   if (validateID) {
//     return res.status(404).json({ message: 'Product not found' });
//   }

//   return next();
// };

module.exports = {
  product,
  // productId,
};