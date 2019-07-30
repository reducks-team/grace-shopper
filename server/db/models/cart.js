const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('carts', {
  products: {
    type: Sequelize.ARRAY
    // Sequelize.JSON
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  orderCost: {
    type: Sequelize.NUMBER
  },
  shippedTo: {
    type: Sequelize.JSON
  },
  cardBilled: {
    type: Sequelize.JSON
  }
})

module.exports = Cart
