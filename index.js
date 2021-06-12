const express = require('express')

const db = require('./db')
const util = require('util')
const crypt = require('./hash')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
const port = process.env.PORT || 5000

app.get('/', (req, res) => {res.send('Dashboard')})

const AsyncQuery = util.promisify(db.query).bind(db)

app.post('/user/add', async (req, res, next) => {
    try {
        const username = req.body.Username
        const nama = req.body.Nama
        const password = crypt.encrypt(req.body.Password)
        const createBy = req.body.CreateBy
        const rows = await AsyncQuery(`CALL AddUser('${username}', '${nama}','${password}', ${createBy})`)
        res.send(rows)
    } 
    catch (err) {
        console.log(err.message)
        next(err)
    }
})

app.put('/user/edit', async (req, res, next) => {
    try {
        const userID = req.body.UserID
        const username = req.body.Username
        const password = crypt.encrypt(req.body.Password)
        const updateBy = req.body.UpdateBy
        const rows = await AsyncQuery(`CALL EditUser('${userID}', '${username}','${password}', ${updateBy})`)
        res.send(password)
    } 
    catch (err) {
        console.log(err.message)
        next(err)
    }
})

app.post('/user/login', async (req, res, next) => {
    try {
        const username = req.body.Username
        const password = crypt.encrypt(req.body.Password)

        const rows = await AsyncQuery(`CALL Login('${username}', '${password}')`)
        if (rows[0].length > 0) {
            res.send({status: true, message: ''})
        } 
        else {
            res.json({status: false, message: 'Username atau Password Salah'})
        }
    } 
    catch (err) {
        console.log(err.message)
        next(err)
    }
})



app.listen(port, () => {console.log(`Listen on ${port}`)})

// https://prod.liveshare.vsengsaas.visualstudio.com/join?2FEC82433903F74493FBBC40C7AB20D5EF40
// https://prod.liveshare.vsengsaas.visualstudio.com/join?5D1F4DC01F8CB359612BCE33C61D5003EE08