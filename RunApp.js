const express = require('express')
const port = 3030
const app = express()

app.get('/', function(req,res)  {
    res.sendFile(__dirname + "/index.html")
})

app.listen(port, () => {
    console.log('Server [ON]')
})