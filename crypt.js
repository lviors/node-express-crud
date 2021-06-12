const crypto = require('crypto');
const hash = crypto.createHash('sha256');

const encrypt = function(string) {
    var data = hash.update(string, 'utf-8');
    return data.digest('hex');
}

const decrypt = function(hash) {
    return hash;
}

module.exports = {
    encrypt,
    decrypt
}
