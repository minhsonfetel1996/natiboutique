/**
 * @author spm
 */
module.exports = (app) => {
  app.use("/api/shop", require("./shop_routes"));
  app.use("/api/auth", require("./users_routes"));
  app.use("/api/products", require("./products_routes"));
  app.use("/api/cart", require("./cart_routes"));
};
