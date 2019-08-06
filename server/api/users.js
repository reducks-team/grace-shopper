const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['firstName', 'lastName', 'id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(Number(req.params.id))
    if (!singleUser) res.sendStatus(404)
    res.json(singleUser)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newUser = await User.create(req.body)
    res.send(newUser)
  } catch (error) {
    console.dir(error)
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    console.log(req.body)
    console.log(req.params.id)
    const userToUpdate = await User.findByPk(Number(req.params.id))
    !userToUpdate && res.sendStatus(404)
    await userToUpdate.update(req.body)

    res.send(userToUpdate)
  } catch (error) {
    console.dir(error)
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const userToDelete = await User.findByPk(Number(req.params.id))
    !userToDelete && res.sendStatus(404)
    await userToDelete.destroy()
    const response = {
      message: 'The user has been successfully destroyed!',
      deletedId: req.params.id
    }
    res.send(response)
  } catch (error) {
    console.error(error)
    next(error)
  }
})
