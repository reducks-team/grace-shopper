const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    validate: {
      notEmpty: true
    }
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  },
  phoneNumber: {
    type: Sequelize.BIGINT
  },
  streetAddress: {
    type: Sequelize.STRING
  },
  AddressLineTwo: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING
  },
  country: {
    type: Sequelize.STRING
  },
  postalCode: {
    type: Sequelize.INTEGER
  },
  billingStreetAddress: {
    type: Sequelize.STRING
  },
  billingAddressLineTwo: {
    type: Sequelize.STRING
  },
  billingCity: {
    type: Sequelize.STRING
  },
  billingState: {
    type: Sequelize.STRING
  },
  billingCountry: {
    type: Sequelize.STRING
  },
  billingPostalCode: {
    type: Sequelize.INTEGER
  },
  creditCardNumber: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('creditCardNumber')
    }
  },
  expirationDate: {
    type: Sequelize.STRING
  },
  securityCode: {
    type: Sequelize.INTEGER
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encrypt(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encrypt = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltPasswordCC = user => {
  if (user.changed('password') || user.changed('creditCardNumber')) {
    user.salt = User.generateSalt()
    user.password = User.encrypt(user.password(), user.salt())
    if (user.creditCardNumber()) {
      user.creditCardNumber = User.encrypt(user.creditCardNumber(), user.salt())
    }
  }
}

User.beforeCreate(setSaltPasswordCC)
User.beforeUpdate(setSaltPasswordCC)
User.beforeBulkCreate(users => {
  users.forEach(setSaltPasswordCC)
})
