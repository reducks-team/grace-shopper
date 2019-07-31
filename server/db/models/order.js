const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('orders', {
  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  shippedTo: {
    type: Sequelize.JSON
  },
  cardBilled: {
    type: Sequelize.JSON
  },
  product: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  }
})

module.exports = Order
