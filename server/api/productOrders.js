const router = require('express').Router()
const {productOrder} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const productOrders = await productOrder.findAll()
    res.json(productOrders)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleProductOrder = await productOrder.findByPk(
      Number(req.params.id)
    )
    if (!singleProductOrder) res.sendStatus(404)
    res.json(singleProductOrder)
  } catch (error) {
    next(error)
  }
})

//Currently this route is unused.  If it becomes used, it should be updated so that req.body is not passed in directly.  To prevent unauthorized access the route is being commented out until it is needed.
/* router.post('/', async (req, res, next) => {
  try {
    const newProductOrder = await productOrder.create(req.body)
    res.send(newProductOrder)
  } catch (error) {
    console.dir(error)
    next(error)
  }
}) */

//Currently this route is unused.  If it becomes used, it should be updated so that req.body is not passed in directly.  To prevent unauthorized access the route is being commented out until it is needed.
/* router.put('/:id', async (req, res, next) => {
  try {
    const productOrderToUpdate = await productOrder.findByPk(
      Number(req.params.id)
    )
    !productOrderToUpdate && res.sendStatus(404)
    await productOrderToUpdate.update(req.body)

    res.send(productOrderToUpdate)
  } catch (error) {
    console.dir(error)
    next(error)
  }
}) */

//To prevent unauthorized access this route is being commented out until it is needed.
/* router.delete('/:id', async (req, res, next) => {
  try {
    const productOrderToDelete = await productOrder.findByPk(
      Number(req.params.id)
    )
    !productOrderToDelete && res.sendStatus(404)
    await productOrderToDelete.destroy()
    const response = {
      message: 'The productOrder has been successfully destroyed!',
      deletedId: req.params.id
    }
    res.send(response)
  } catch (error) {
    console.error(error)
    next(error)
  }
}) */
