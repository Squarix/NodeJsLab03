'use strict';
module.exports = (sequelize, DataTypes) => {
  const Renter = sequelize.define('Renter', {
    name: DataTypes.STRING
  }, {});
  Renter.associate = function(models) {
    // associations can be defined here
  };
  return Renter;
};