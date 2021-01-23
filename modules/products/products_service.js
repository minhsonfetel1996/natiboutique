const ProductsSchema = require("./products");

const getById = (_id) => {
  return new Promise((resolve, reject) => {
    ProductsSchema.findOne({ _id })
      .then((product) => resolve(product))
      .catch((error) => {
        reject(error);
      });
  });
};

const getByIdAndInStock = (_id) => {
  return new Promise((resolve, reject) => {
    ProductsSchema.findOne({ _id, onStock: true })
      .then((product) => resolve(product))
      .catch((error) => {
        reject(error);
      });
  });
};

const getByIdsAndInStock = (ids) => {
  return new Promise((resolve, reject) => {
    ProductsSchema.find({ _id: { $in: [...ids] }, onStock: true })
      .then((products) => resolve(products))
      .catch((error) => {
        reject(error);
      });
  });
};

const getProducts = (filter, { limit, sort, skip }) => {
  return new Promise((resolve, reject) => {
    skip = parseInt(skip < 0 ? 0 : skip);
    limit = parseInt(limit < 0 ? 6 : limit);
    Promise.all([
      ProductsSchema.find(filter).countDocuments(),
      ProductsSchema.find(filter)
        .limit(limit)
        .skip(skip)
        .sort({
          onStock: -1,
          title: sort || "asc",
          updatedTs: sort,
          createdTs: sort,
        }),
    ])
      .then(([total, products]) => {
        resolve({
          data: products,
          meta: {
            total,
            limit: limit,
            hasMore: parseInt(skip / limit) < parseInt(total / limit),
          },
        });
      })
      .catch((error) => {
        console.error("Having error during get products", error);
        reject("Having error during get products");
      });
  });
};

module.exports = {
  getProducts,
  getById,
  getByIdAndInStock,
  getByIdsAndInStock,
};
