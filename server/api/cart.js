const router = require('express').Router()
const {Order, Product, productOrder} = require('../db/models')
const Sequelize = require('sequelize')
module.exports = router

//This route gets every item in a current user's active order (their cart)
router.get('/:userId', async (req, res, next) => {
  try {
    const activeCart = await Order.findOne({
      where: {userId: Number(req.params.userId), isActive: true},
      attributes: ['id']
    })
    const activeOrderId = activeCart.id
    const allProductsInCart = await productOrder.findAll({
      where: {orderId: activeOrderId},
      include: [{model: Product}]
    })
    res.send(allProductsInCart)
  } catch (error) {
    console.dir(error)
    next(error)
  }
})

//This route gets the active cart, checks whether an item exists in the cart or not, and then either creates an entry for it or updates the existing entry as appropriate.  Then it returns the new cart with the appropriate quantities
router.put('/:userId/:productId/:productCost', async (req, res, next) => {
  try {
    const activeCart = await Order.findOne({
      where: {userId: Number(req.params.userId), isActive: true},
      attributes: ['id']
    })
    const activeOrderId = activeCart.id
    const allProductsInCart = await productOrder.findAll({
      where: {orderId: activeOrderId},
      include: [{model: Product}]
    })

    let filteredArray = allProductsInCart.filter(
      product =>
        Number(product.dataValues.productId) === Number(req.params.productId)
    )
    if (filteredArray.length) {
      await productOrder.update(
        {quantity: Sequelize.literal('quantity + 1')},
        {where: {productId: req.params.productId, orderId: activeOrderId}}
      )
    } else {
      await productOrder.create({
        productId: req.params.productId,
        quantity: 1,
        itemCost: req.params.productCost,
        orderId: activeOrderId
      })
    }

    const UpdatedProductsInCart = await productOrder.findAll({
      where: {orderId: activeOrderId}
    })
    res.send(UpdatedProductsInCart)
  } catch (error) {
    console.dir(error)
    next(error)
  }
})
