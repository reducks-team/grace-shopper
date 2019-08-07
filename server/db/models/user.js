const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
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
    type: Sequelize.STRING
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
  //isAdmin is locate in the middle of all this for the sake of security, making it more difficult to guess where it comes in the table structure
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    validate: {
      notEmpty: true
    }
  },
  state: {
    type: Sequelize.STRING
  },
  country: {
    type: Sequelize.STRING
  },
  postalCode: {
    type: Sequelize.STRING
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
    type: Sequelize.STRING
  },
  creditCardNumber: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('creditCardNumber')
    }
  },
  expirationDate: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('expirationDate')
    }
  },
  securityCode: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('securityCode')
    }
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
const setAllEncrypted = user => {
  if (
    user.changed('password') ||
    user.changed('creditCardNumber') ||
    user.changed('expirationDate') ||
    user.changed('securityCode')
  ) {
    user.salt = User.generateSalt()
    user.password = User.encrypt(user.password(), user.salt())
    if (user.creditCardNumber()) {
      user.creditCardNumber = User.encrypt(user.creditCardNumber(), user.salt())
    }
    if (user.expirationDate()) {
      user.expirationDate = User.encrypt(user.expirationDate(), user.salt())
    }
    if (user.securityCode()) {
      user.securityCode = User.encrypt(user.securityCode(), user.salt())
    }
  }
}

User.beforeCreate(setAllEncrypted)
User.beforeUpdate(setAllEncrypted)
User.beforeBulkCreate(users => {
  users.forEach(setAllEncrypted)
})
