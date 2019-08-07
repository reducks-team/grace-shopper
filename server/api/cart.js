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

//This route gets the order history for a user
router.get('/history/:userId', async (req, res, next) => {
  try {
    const historicalOrders = await Order.findAll({
      where: {userId: Number(req.params.userId), isActive: false},
      include: [{model: productOrder, include: [Product]}]
    })
    res.send(historicalOrders)
  } catch (error) {
    console.dir(error)
    next(error)
  }
})

//This route gets the active cart, checks whether an item exists in the cart or not, and then either creates an entry for it or updates the existing entry as appropriate.  Then it returns the new cart with the appropriate quantities
router.put('/add', async (req, res, next) => {
  try {
    //This protects against unauthorized requests by checking whether the request body has the "allowed" parameter set to true, which an attacker wouldn't know to include but which the code will always include
    if (!req.body.allowed) {
      res.json({error: 'unauthorized'})
      return
    }

    const activeCart = await Order.findOne({
      where: {userId: Number(req.body.userId), isActive: true},
      attributes: ['id']
    })
    const activeOrderId = activeCart.id
    const allProductsInCart = await productOrder.findAll({
      where: {orderId: activeOrderId},
      include: [{model: Product}]
    })

    let filteredArray = allProductsInCart.filter(
      product =>
        Number(product.dataValues.productId) === Number(req.body.productId)
    )
    if (filteredArray.length) {
      await productOrder.update(
        {quantity: Sequelize.literal('quantity + 1')},
        {where: {productId: req.body.productId, orderId: activeOrderId}}
      )
    } else {
      await productOrder.create({
        productId: req.body.productId,
        quantity: 1,
        itemCost: req.body.productCost,
        orderId: activeOrderId
      })
    }

    const UpdatedProductsInCart = await productOrder.findAll({
      where: {orderId: activeOrderId},
      include: [{model: Product}]
    })
    res.send(UpdatedProductsInCart)
  } catch (error) {
    console.dir(error)
    next(error)
  }
})

router.put('/update', async (req, res, next) => {
  try {
    //This protects against unauthorized requests by checking whether the request body has the "allowed" parameter set to true, which an attacker wouldn't know to include but which the code will always include
    if (!req.body.allowed) {
      res.json({error: 'unauthorized'})
      return
    }

    const activeCart = await Order.findOne({
      where: {userId: Number(req.body.userId), isActive: true},
      attributes: ['id']
    })
    const activeOrderId = activeCart.id
    const allProductsInCart = await productOrder.findAll({
      where: {orderId: activeOrderId},
      include: [{model: Product}]
    })

    let filteredArray = allProductsInCart.filter(
      product =>
        Number(product.dataValues.productId) === Number(req.body.productId)
    )
    if (filteredArray.length) {
      await productOrder.update(
        {quantity: req.body.quantity},
        {where: {productId: req.body.productId, orderId: activeOrderId}}
      )
    }

    const UpdatedProductsInCart = await productOrder.findAll({
      where: {orderId: activeOrderId},
      include: [{model: Product}]
    })
    res.send(UpdatedProductsInCart)
  } catch (error) {
    console.dir(error)
    next(error)
  }
})

//This route creates a new active order
router.post('/new/:userId', async (req, res, next) => {
  try {
    //This protects against unauthorized requests by checking whether the request body has the "allowed" parameter set to true, which an attacker wouldn't know to include but which the code will always include
    if (!req.body.allowed) {
      res.json({error: 'unauthorized'})
      return
    }

    const newCart = await Order.create({userId: req.params.userId})
    res.send(newCart)
  } catch (error) {
    console.dir(error)
    next(error)
  }
})

//This route flips the current active cart to a historical order
router.put('/checkout/:userId', async (req, res, next) => {
  try {
    //This protects against unauthorized requests by checking whether the request body has the "allowed" parameter set to true, which an attacker wouldn't know to include but which the code will always include
    if (!req.body.allowed) {
      res.json({error: 'unauthorized'})
      return
    }

    const updatedCart = await Order.update(
      {isActive: false},
      {where: {userId: req.params.userId, isActive: true}}
    )
    res.send(updatedCart)
  } catch (error) {
    console.dir(error)
    next(error)
  }
})
