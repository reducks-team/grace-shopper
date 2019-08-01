const router = require('express').Router()
const {User, Order, productOrder} = require('../db/models')
const Sequelize = require('sequelize')
module.exports = router

//This route gets every item in a current user's active order (their cart)
router.get('/:userId', async (req, res, next) => {
  try {
    const activeCart = await Order.findOne({
      where: {id: Number(req.params.userId), isActive: true},
      attributes: ['id']
    })
    const activeOrderId = activeCart.id
    const allProductsInCart = await productOrder.findAll({
      where: {orderId: activeOrderId}
    })
    res.send(allProductsInCart)
  } catch (error) {
    console.dir(error)
    next(error)
  }
})

router.put('/:userId/:productId/:productCost', async (req, res, next) => {
  try {
    const activeCart = await Order.findByPk(Number(req.params.userId))
    const activeOrderId = activeCart.id
    const allProductsInCart = await productOrder.findAll({
      where: {orderId: activeOrderId}
    })

    let tempArr = [...allProductsInCart]
    let filteredArray = tempArr.filter(
      product =>
        Number(product.dataValues.productId) === Number(req.params.productId)
    )
    if (filteredArray.length) {
      productOrder.update(
        {quantity: 1},
        {where: {productId: req.params.productId, orderId: activeOrderId}}
      )
    } else {
      productOrder.create({
        productId: req.params.productId,
        quantity: 1,
        itemCost: req.params.productCost,
        orderId: activeOrderId
      })
    }

    const allProductsInCart2 = await productOrder.findAll({
      where: {orderId: activeOrderId}
    })
    res.send(allProductsInCart2)
  } catch (error) {
    console.dir(error)
    next(error)
  }
})
