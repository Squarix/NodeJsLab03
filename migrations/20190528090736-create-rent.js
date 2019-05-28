'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Rent', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      stockId: {
        type: Sequelize.UUID,
        references: {
          model: 'Stock',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      renterId: {
        type: Sequelize.UUID,
        references: {
          model: 'Renter',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      startDate: {
        type: Sequelize.DATE
      },
      price: {
        type: Sequelize.NUMBER
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('rents');
  }
};