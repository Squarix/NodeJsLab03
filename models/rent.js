'use strict';
module.exports = (sequelize, DataTypes) => {
  const rent = sequelize.define('rent', {
    stockId: DataTypes.NUMBER,
    renterId: DataTypes.NUMBER,
    startDate: DataTypes.DATE,
    price: DataTypes.NUMBER
  }, {});
  rent.associate = function(models) {
    // associations can be defined here
  };
  return rent;
};