const express = require('express')
const app = express()
const port = 3000

app.get('/route1', (req, res) => {
  res.send('Hello world')
})

app.get('/route2',(req,res) => {
    res.send("trying to figure out node js")
})

app.post('/route3', (req, res) => {
    
    res.send('Got a POST request')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})