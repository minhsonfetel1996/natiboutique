const { model, Schema } = require("mongoose");
const audit = require("../model/audit");

const ProductsSchema = Schema(
  {
    main_product_id: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    subTitle: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    color_description: {
      type: String,
      trim: true,
    },
    images: {
      type: Object,
      required: true,
    },
    price: {
      type: Object,
      required: true,
    },
    sizes: {
      type: Object,
      required: true,
    },
    color_ways: {
      type: Object,
    },
    onStock: {
      type: Boolean,
      required: true,
    },
    ...audit,
  },
  { strict: true }
);

ProductsSchema.pre(["updateOne", "findOneAndUpdate", "save"], function (next) {
  this.updatedTs = Date.now();
  next();
});

ProductsSchema.index({ name: "title" }, { weights: { name: 3 } });
ProductsSchema.index({ name: "subTitle" }, { weights: { name: 3 } });
ProductsSchema.index({ name: "description" }, { weights: { name: 3 } });
ProductsSchema.index({ name: "colorDescription" }, { weights: { name: 3 } });
ProductsSchema.index({ name: "category" }, { weights: { name: 3 } });

module.exports = model("Products", ProductsSchema);
