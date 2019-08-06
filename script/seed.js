'use strict'

const db = require('../server/db')
const {User, Product, Order, productOrder} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'dmrusyniak@gmail.com',
      password: '12345',
      firstName: 'David',
      lastName: 'Rusyniak',
      phoneNumber: 5555555555,
      streetAddress: '123 Fake St.',
      addressLineTwo: 'Apartment 3F',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      postalCode: '11201',
      billingStreetAddress: '123 Fake St.',
      billingAddressLineTwo: 'Apartment 3F',
      billingCity: 'New York',
      billingState: 'NY',
      billingCountry: 'USA',
      billingPostalCode: '11201',
      creditCardNumber: '4786872559155654',
      expirationDate: '07/22',
      securityCode: '756'
    }),
    User.create({
      email: 'fgibbs@esgn.com',
      password: '06812',
      firstName: 'Freddie',
      lastName: 'Gibbs'
    })
  ])

  const products = await Promise.all([
    Product.create({
      name: 'Sailor Duck',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0604/4801/products/Sailor_1_1024x1024.jpeg?v=1505606552',
      description: 'Lorem ipsum sailor est',
      price: 1999,
      inventory: 100,
      tags: ['lorem', 'ipsum']
    }),
    Product.create({
      name: 'Elvis Duck',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0604/4801/products/Elvis_1-min-min_1024x1024.jpg?v=1534974546',
      description: 'dolor sit amet',
      price: 549,
      inventory: 50,
      tags: ['donec', 'maximus']
    }),
    Product.create({
      name: 'Test Duck',
      description: 'This is our one test duck',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0604/4801/products/Elvis_1-min-min_1024x1024.jpg?v=1534974546',
      price: 69,
      inventory: 15,
      tags: ['donec', 'maximus']
    }),
    Product.create({
      name: 'Rubber Turkey Duck',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0604/4801/products/Turkey_1_1024x1024.jpeg?v=1505453354',
      description: 'thanksgiving duck',
      price: 999,
      inventory: 200,
      tags: ['lorem', 'ipsum']
    }),
    Product.create({
      name: 'Pirate Duck',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0604/4801/products/Pirate_1_b0a169e0-feba-450d-b81b-f3db5703c7d4_1024x1024.jpeg?v=1514697320',
      description: 'arggggggggh',
      price: 749,
      inventory: 150,
      tags: ['donec', 'maximus']
    }),
    Product.create({
      name: 'Baseball Duck',
      description: 'lets play ball',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0604/4801/products/baseball_1_modified_1024x1024.jpg?v=1505346044',
      price: 699,
      inventory: 1,
      tags: ['donec', 'maximus']
    })
  ])

  const orders = await Promise.all([
    Order.create({
      isActive: false,
      shippedTo: users[0],
      cardBilled: {},
      userId: users[0].id
    }),
    Order.create({
      isActive: false,
      shippedTo: users[0],
      cardBilled: {},
      userId: users[0].id
    }),
    Order.create({
      isActive: false,
      shippedTo: users[0],
      cardBilled: {},
      userId: users[0].id
    }),
    Order.create({
      isActive: false,
      shippedTo: users[0],
      cardBilled: {},
      userId: users[0].id
    }),
    Order.create({
      isActive: true,
      shippedTo: null,
      cardBilled: null,
      userId: users[1].id
    }),
    Order.create({
      isActive: true,
      shippedTo: null,
      cardBilled: null,
      userId: users[0].id
    })
  ])

  const productOrders = await Promise.all([
    productOrder.create({
      quantity: 1,
      itemCost: products[0].price,
      orderId: orders[0].id,
      productId: products[0].id
    }),
    productOrder.create({
      quantity: 2,
      itemCost: products[0].price,
      orderId: orders[1].id,
      productId: products[0].id
    }),
    productOrder.create({
      quantity: 3,
      itemCost: products[0].price,
      orderId: orders[2].id,
      productId: products[0].id
    }),
    productOrder.create({
      quantity: 4,
      itemCost: products[0].price,
      orderId: orders[3].id,
      productId: products[0].id
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded ${productOrders.length} productOrders`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
