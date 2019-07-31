const Sequelize = require('sequelize')
const db = require('../db')

const productOrder = db.define('productOrder', {
  quantity: {
    type: Sequelize.INTEGER
  },
  itemCost: {
    type: Sequelize.INTEGER
  }
})

module.exports = productOrder
