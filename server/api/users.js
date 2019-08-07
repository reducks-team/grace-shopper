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
    //In this structure the only data that is captured on signUp is the email, password, firstName, and lastName (the required fields)
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    })

    //The newUser and the req.body must be sent so that the password in the form (stored in req.body) can be hashed and checked against the stored password (will always match but the route breaks without it), when the user creates an account and then immediately logs in
    res.send({newUser, body: req.body})
  } catch (error) {
    console.dir(error)
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const userToUpdate = await User.findByPk(Number(req.params.id))
    !userToUpdate && res.sendStatus(404)
    await userToUpdate.update({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      streetAddress: req.body.streetAddress,
      addressLineTwo: req.body.addressLineTwo,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      postalCode: req.body.postalCode,
      billingStreetAddress: req.body.billingStreetAddress,
      billingAddressLineTwo: req.body.billingAddressLineTwo,
      billingCity: req.body.billingCity,
      billingState: req.body.billingState,
      billingCountry: req.body.billingCountry,
      billingPostalCode: req.body.billingPostalCode,
      creditCardNumber: req.body.creditCardNumber,
      expirationDate: req.body.expirationDate,
      securityCode: req.body.securityCode
    })
    res.send(userToUpdate)
  } catch (error) {
    console.dir(error)
    next(error)
  }
})

//To prevent unauthorized access this route is being commented out until it is needed.
/* router.delete('/:id', async (req, res, next) => {
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
}) */
