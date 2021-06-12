const express = require('express');
const db = require('./db');
const util = require('util');
const crypt = require('./crypt');

const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Dashboard');
});

const asyncQuery = util.promisify(db.query).bind(db);

app.get('/users', async (req, response, next) => {
    try {      
        const username = 'admin';
        const password = 'c7ad44cbad762a5da0a452f9e854fdc1e0e7a52a38015f23f3eab1d80b931dd472634dfac71cd34ebc35d16ab7fb8a90c81f975113d6c7538dc69dd8de9077ec';
        
        console.log(crypt.encrypt('admin'))

        const rows = await asyncQuery('SELECT * FROM login WHERE Username=? && Password=?',[username,password])
        response.send(rows)
    } 
    catch (err) {
        console.log(err.message);
        next(err);
    }
});

app.listen(port, () => {
    console.log(`Listen on ${port}`);
});

// https://prod.liveshare.vsengsaas.visualstudio.com/join?2FEC82433903F74493FBBC40C7AB20D5EF40