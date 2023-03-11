const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.changeColumn("orders", "amount", {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.changeColumn("orders", "amount", {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    });
  },
};
