const con = require('./../connections/connection')
const busboy = require('busboy')

const path = require('path');
const fs = require('fs')

const getCountry = (req, res) => {
    con.query('select * from countries', (err, data) => {
        res.json(data)
        res.end()
    })

}

const getStates = (req, res) => {
    const id = req.params.id
    con.query(`select * from states where country_id = ${id}`,(err,data)=>{
        res.json(data)
    })
}
const getCities = (req, res) => {
    const id = req.params.id
    con.query(`select * from cities where state_id = ${id}`,(err,data)=>{
        res.json(data)
    })
}

const getCitiesWi = (req,res)=>{
    con.query('select * from cities',(err,data)=>{
        if(err) throw err
        if(data){
            res.status(200).json(data)
        }
    })
}

const getStatesWi = (req, res)=>{
    con.query('select * from states', (err,data)=>{
        if(err) throw err
        if(data){
            res.status(200).json(data)
        }
    })
}

const uploadFile = (req, res) => {
    console.log('you entered in file upload function')
    let filename = '';
    const bb = busboy({
        headers: req.headers
    })
    bb.on('file', (name, file, info) => {
        filename = info.filename
        const timestamp = new Date().getTime();
        const fileExtension = path.extname(filename);
        filename = `${timestamp}${fileExtension}`;
        const saveTo = path.join(__dirname, '../uploads', filename);
        file.pipe(fs.createWriteStream(saveTo))
    })
    bb.on('close', () => {
        res.json({imgName: filename})
    })
    req.pipe(bb)
}



module.exports = { getCountry, uploadFile, getStates, getCities, getCitiesWi, getStatesWi}