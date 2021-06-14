const crypto = require('crypto')

encrypt = (Password) => { return crypto.createHash("sha512", Password).update(Password).digest("hex") }

module.exports = encrypt