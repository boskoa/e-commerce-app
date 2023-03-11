const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.changeColumn("ordered_products", "order_id", {
      type: DataTypes.INTEGER,
      allowNull: true,
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.changeColumn("ordered_products", "order_id", {
      type: DataTypes.INTEGER,
      allowNull: false,
    });
  },
};
