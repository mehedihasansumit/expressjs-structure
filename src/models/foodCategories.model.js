// const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const FoodCategory = sequelize.define("foodCategories", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return FoodCategory;
};