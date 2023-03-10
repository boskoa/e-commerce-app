const { Category } = require("./category");
const { Order } = require("./order");
const { OrderedProduct } = require("./orderedProduct");
const { Product } = require("./product");
const { Product_Category } = require("./ProductCategories");
const { User } = require("./user");

Product.belongsToMany(Category, {
  through: Product_Category,
});
Category.belongsToMany(Product, {
  through: Product_Category,
});

User.hasMany(Order);
Order.belongsTo(User);

Product.hasMany(OrderedProduct);
OrderedProduct.belongsTo(Product);

User.hasMany(OrderedProduct);
OrderedProduct.belongsTo(User);

Order.hasMany(OrderedProduct);
OrderedProduct.belongsTo(Order);

module.exports = { User, Product, OrderedProduct, Order, Category };
