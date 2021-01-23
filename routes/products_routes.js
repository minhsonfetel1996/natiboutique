const express = require("express");
const { verifyToken } = require("../modules/jwt/jwt_service");
const ProductsRouter = express.Router();
const ProductsService = require("../modules/products/products_service");

const { successResponse, badRequest } = require("./common/response_templates");

const getProductsApplyPagination = (filter, req, res) => {
  const { limit = 6, sort = "desc", skip = 0 } = req.query;
  ProductsService.getProducts(filter, { limit, sort, skip })
    .then((result) => {
      return successResponse(null, result, res);
    })
    .catch((error) => {
      return res.status(500).json({ msg: error.message });
    });
};

const escapeRegexForFuzzySearch = (text) => {
  return text ? text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") : text;
};

const getProducts = (req, res) => {
  const _keyword = req.query._keyword;
  let filter = {};
  if (_keyword && _keyword.length > 0) {
    const regExp = new RegExp(escapeRegexForFuzzySearch(_keyword), "gi");
    filter = {
      $or: [
        { title: regExp },
        { subTitle: regExp },
        { description: regExp },
        { color_description: regExp },
        {
          category: regExp,
        },
      ],
    };
  }
  return getProductsApplyPagination(filter, req, res);
};

const getProductDetail = (req, res) => {
  const _id = req.params.id;
  if (!_id) {
    return badRequest(res, "Invalid id: " + _id);
  }
  ProductsService.getById(_id)
    .then((product) => {
      return successResponse(null, product, res);
    })
    .catch((error) => {
      console.error("Having error during get product by id:", error);
      return res
        .status(500)
        .json({ msg: "Having error during get product by id: " + _id });
    });
};

ProductsRouter.route("/").get(verifyToken, getProducts);
ProductsRouter.route("/:id").get(verifyToken, getProductDetail);

module.exports = ProductsRouter;
