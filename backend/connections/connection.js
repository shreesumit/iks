const mysql = require('mysql')

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sumit1234',
    database: 'ikstest'
})

con.connect((err)=>{
    if(err) throw err
    console.log("__________________database connected")
})

module.exports = con;