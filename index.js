const express = require('express')
const util = require('util')
const app = express()

const db = require('./db')
const AsyncQuery = util.promisify(db.query).bind(db)

const crypt = require('./hash')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => { res.send('Dashboard') })

app.post('/user/add', async (req, res, next) => {
    try {
        const username = req.body.Username
        const nama = req.body.Nama
        const password = crypt.encrypt(req.body.Password)
        const createBy = req.body.CreateBy
        const rows = await AsyncQuery(`CALL Add_User('${username}', '${nama}','${password}', ${createBy})`)
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
        const rows = await AsyncQuery(`CALL Edit_User('${userID}', '${username}','${password}', ${updateBy})`)
        res.send(rows)
    }
    catch (err) {
        console.log(err.message)
        next(err)
    }
})

app.put('/user/del', async (req, res, next) => {
    try {
        const userID = req.body.UserID
        const deleteBy = req.body.DeleteBy
        const rows = await AsyncQuery(`CALL Del_User('${userID}',${deleteBy})`)
        res.send(rows)
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
            res.send({ status: true, message: '' })
        }
        else {
            res.json({ status: false, message: 'Username atau Password Salah' })
        }
    }
    catch (err) {
        console.log(err.message)
        next(err)
    }
})

app.post('/pegawai/add', async (req, res, next) => {
    try {
        const idPegawai = req.body.ID_Pegawai
        const idGrup = req.body.ID_Grup
        const nama = req.body.Nama
        const status = req.body.Status_Kepegawaian
        const tglMasuk = req.body.Tgl_Masuk
        const rekening = req.body.Rekening
        const gajiPokok = req.body.Gaji_Pokok
        const tunjangan = req.body.Tunjangan
        const npwp = req.body.NPWP
        const ptkp = req.body.PTKP
        const createBy = req.body.CreateBy

        const rows = await AsyncQuery(`CALL Add_Pegawai('${idPegawai}', '${idGrup}', 
        '${nama}', '${status}', ${tglMasuk}, '${rekening}, ${gajiPokok}, ${tunjangan}, '${npwp}',
        '${ptkp}', ${createBy})`)

        res.send(rows)
    }
    catch (err) {
        console.log(err.message)
        next(err)
    }
})

app.put('/pegawai/edit', async (req, res, next) => {
    try {
        const idPegawai = req.body.ID_Pegawai
        const idGrup = req.body.ID_Grup
        const nama = req.body.Nama
        const status = req.body.Status_Kepegawaian
        const tglMasuk = req.body.Tgl_Masuk
        const rekening = req.body.Rekening
        const gajiPokok = req.body.Gaji_Pokok
        const tunjangan = req.body.Tunjangan
        const npwp = req.body.NPWP
        const ptkp = req.body.PTKP
        const updateBy = req.body.UpdateBy

        const rows = await AsyncQuery(`CALL Edit_Pegawai('${idPegawai}', '${idGrup}', 
        '${nama}', '${status}', ${tglMasuk}, '${rekening}, ${gajiPokok}, ${tunjangan}, '${npwp}',
        '${ptkp}', ${updateBy})`)

        res.send(rows)
    }
    catch (err) {
        console.log(err.message)
        next(err)
    }
})

app.put('/pegawai/del', async (req, res, next) => {
    try {
        const idPegawai = req.body.ID_Pegawai
        const tglKeluar = req.body.Tgl_Keluar
        const deleteBy = req.body.DeleteBy

        const rows = await AsyncQuery(`CALL Del_Pegawai('${idPegawai}', ${tglKeluar}, ${deleteBy})`)

        res.send(rows)
    }
    catch (err) {
        console.log(err.message)
        next(err)
    }
})

app.get('/pegawai/get', async (req, res, next) => {
    try {
        const rows = await AsyncQuery(`CALL Get_Pegawai()`)
        res.json(rows[0])
    }
    catch (err) {
        console.log(err.message)
        next(err)
    }
})

app.post('/gaji', async (req, res, next) => {
    try {
        const idPegawai = req.body.ID_Pegawai
        const hariKerja = req.body.Hari_Kerja
        const tunjangan = req.body.Tunjangan
        const jamLembur = req.body.Jam_Lembur
        const uangLembur = req.body.Uang_Lembur
        const potongan = req.body.Potongan
        const totalGaji = req.body.Total_Gaji
        const periode = req.body.Periode
        const createBy = req.body.CreateBy

        const rows = await AsyncQuery(`CALL Add_Gaji('${idPegawai}', '${hariKerja}', 
        '${tunjangan}', '${jamLembur}', ${uangLembur}, '${potongan}, ${totalGaji}, ${periode}, ${createBy})`)

        res.send(rows)
    }
    catch (err) {
        console.log(err.message)
        next(err)
    }
})


const port = process.env.PORT || 5000
app.listen(port, () => { console.log(`Listen on ${port}`) })

// https://prod.liveshare.vsengsaas.visualstudio.com/join?2FEC82433903F74493FBBC40C7AB20D5EF40
// https://prod.liveshare.vsengsaas.visualstudio.com/join?5D1F4DC01F8CB359612BCE33C61D5003EE08