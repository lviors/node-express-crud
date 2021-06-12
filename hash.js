const crypto = require('crypto')
const hash = crypto.createHash('sha512')

encrypt = (Password) => {return crypto.createHash("sha512", Password).update(Password).digest("hex")}

module.exports = {encrypt}

class Mahasiswa {
    constructor() {
        
    }

    method_1() {

    }
}

var mahasiswa = new Mahasiswa;