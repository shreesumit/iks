const express = require('express')
const bodyParser = require('body-parser');
// var busboy = require('connect-busboy');
const app = express()
const cors = require('cors')

app.use(cors());
app.use("/images", express.static('uploads'))
app.use(bodyParser.json())
// app.use(busboy()); 

app.use('/',require('./routes/routes'))

app.listen(4000,(err)=>{
    if(err) throw err;
    console.log("______________server STARTED")
})