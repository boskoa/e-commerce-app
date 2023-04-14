const { Category } = require("./category");
const { Order } = require("./order");
const { OrderedProduct } = require("./orderedProduct");
const { Product } = require("./product");
const { Product_Category } = require("./ProductCategories");
const { User } = require("./user");
const { User_Product } = require("./UserProducts");

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

User.belongsToMany(Product, {
  through: User_Product,
});
Product.belongsToMany(User, {
  through: User_Product,
});

Product.hasMany(User_Product);
User_Product.belongsTo(Product);

module.exports = { User, Product, OrderedProduct, Order, Category };
