const express = require("express");
const {
  verifyToken,
  getSimpleUserFromAccessToken,
} = require("../modules/jwt/jwt_service");
const ProductsService = require("../modules/products/products_service");
const CartRouter = express.Router();
const JwtService = require("../modules/jwt/jwt_service");

const {
  failureResponse,
  successResponse,
  badRequest,
} = require("./common/response_templates");
const { generateAccessToken } = require("../modules/jwt/jwt_service");

const loadCart = async (req, res) => {
  // 1. Get cart from token
  const payload = getSimpleUserFromAccessToken(req);
  if (!payload.cart.items || payload.cart.items.length === 0) {
    return successResponse(null, { items: [], totalBasket: 0 }, res);
  }

  // 2. Check valid and on stock of selected products
  const products = await ProductsService.getByIdsAndInStock(
    payload.cart.items.map((c) => c._id)
  );
  if (products.length === 0) {
    payload.cart = {
      items: [],
      totalBasket: 0,
    };
    JwtService.sendSimpleUserAccessToken(res, generateAccessToken(payload));
    return successResponse(null, { ...payload.cart }, res);
  }
  let totalBasket = 0;
  const newCart = [];
  const productImgMap = new Map();
  const productIdMap = new Map();
  
  // Prepare new cart payload for token
  
  products.forEach(p => productIdMap.set(p._id, p));

  payload.cart.items.forEach(item => {
    const product = productIdMap.get(item._id);
    if (product) {
      const newItem = {
        ...item
      };
      newCart.push(item);
      totalBasket += newItem.totalPrice;
      productImgMap.set(product._id, {
        image: product.images[0],
        title: product.title,
      })
    }
  });
  payload.cart = { items: newCart, totalBasket: totalBasket };
  if (products.length !== payload.cart.items.length) {
    // Some products are out of stock
    JwtService.sendSimpleUserAccessToken(res, generateAccessToken(payload));
  }
  payload.cart.items.forEach((item) => {
    item.image = productImgMap.get(item._id).image;
    item.title = productImgMap.get(item._id).title;
  });
  return successResponse(null, { ...payload.cart }, res);
};

const addToCart = (req, res) => {
  const { _id, selectedSize } = req.body;
  if (!_id) {
    return badRequest(res, "Invalid id: " + _id);
  }
  if (!selectedSize || selectedSize.length === 0) {
    return badRequest(res, "Invalid size: " + selectedSize);
  }
  const payload = getSimpleUserFromAccessToken(req);
  const cartItemIndex = payload.cart.items
    ? payload.cart.items.findIndex(
        (item) => item._id === _id && item.selectedSize === selectedSize
      )
    : -1;
  if (cartItemIndex >= 0 && payload.cart.items[cartItemIndex].quantity >= 5) {
    return badRequest(res, "You are allowed to select 5 products");
  }
  ProductsService.getByIdAndInStock(_id)
    .then((product) => {
      if (product) {
        if (
          product.sizes.filter(
            (sizeItem) => sizeItem.size === selectedSize && sizeItem.onStock
          ).length === 0
        ) {
          return badRequest(
            res,
            "Product is out of stock with size: " + selectedSize
          );
        }
        if (cartItemIndex >= 0) {
          const newQuantity = payload.cart.items[cartItemIndex].quantity + 1;

          payload.cart.items[cartItemIndex] = {
            ...payload.cart.items[cartItemIndex],
            quantity: newQuantity,
            currentPrice: product.price.currentPrice,
            oldPrice: product.price.oldPrice,
            totalPrice: +product.price.currentPrice * newQuantity,
            totalOldPrice: +product.price.oldPrice * newQuantity
          };
        } else {
          (payload.cart.items || []).push({
            _id: product._id,
            selectedSize: selectedSize,
            quantity: 1,
            currentPrice: product.price.currentPrice,
            oldPrice: product.price.oldPrice,
            totalPrice: product.price.currentPrice,
            totalOldPrice: product.price.oldPrice,
            image: product.images[0],
            title: product.title,
          });
        }
        if (payload.cart.totalBasket === null) {
          payload.cart.totalBasket = 0;
        }
        payload.cart.totalBasket += parseInt(product.price.currentPrice);
        res.clearCookie(process.env.COOKIE_ACCESS_TOKEN, { path: "/" });
        JwtService.sendSimpleUserAccessToken(res, generateAccessToken(payload));
        return successResponse("Added", { ...payload.cart }, res);
      }
      return failureResponse("Not found product for adding to cart", null, res);
    })
    .catch((error) => {
      console.error("Having error during get product by id:", error);
      return res
        .status(500)
        .json({ msg: "Having error during get product by id: " + _id });
    });
};

const removeItemInCart = async (req, res) => {
  try {
    const keyItems = req.params.key ? req.params.key.split("|") : null;
    const _id = keyItems && keyItems.length > 1 ? keyItems[0] : null;
    const selectedSize = keyItems && keyItems.length > 1 ? keyItems[1] : null;

    if (!_id) {
      return badRequest(res, "Invalid id: " + _id);
    }

    if (!selectedSize) {
      return badRequest(res, "Invalid size: " + selectedSize);
    }

    const payload = getSimpleUserFromAccessToken(req);
    const removedItem = payload.cart.items
      ? payload.cart.items.find(
          (item) => item._id === _id && item.selectedSize === selectedSize
        )
      : null;

    if (!removedItem) {
      return badRequest(res, "Product is not available in cart");
    }
    payload.cart.items = payload.cart.items.filter(
      (item) =>
        item._id !== removedItem._id ||
        (item._id === removedItem._id &&
          item.selectedSize !== removedItem.selectedSize)
    );

    payload.cart.totalBasket -= removedItem.totalPrice;
    res.clearCookie(process.env.COOKIE_ACCESS_TOKEN, { path: "/" });
    JwtService.sendSimpleUserAccessToken(res, generateAccessToken(payload));
    return successResponse("Removed", { ...payload.cart }, res);
  } catch (error) {
    console.error("Having error during remove item in cart:", error);
    return res
      .status(500)
      .json({ msg: "Having error during remove item in cart with id: " + _id });
  }
};

CartRouter.route("/").get(verifyToken, loadCart).post(verifyToken, addToCart);

CartRouter.route("/product/:key").delete(verifyToken, removeItemInCart);

module.exports = CartRouter;
