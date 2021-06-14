const mysql = require('mysql')

var connection = mysql.createConnection({
    host: '192.168.0.55',
    user: 'dbapayroll',
    password: 'payroll123',
    database: 'payroll'
})

module.exports = connection
