'use strict';
module.exports = (sequelize, DataTypes) => {
  const Stock = sequelize.define('Stock', {
    name: DataTypes.STRING
  }, {});
  Stock.associate = function(models) {
    // associations can be defined here
  };
  return Stock;
};