const express = require('express')

const app = express()
const port = 8000

app.get('/index', (req, res) => {

    res.send("hi");
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})