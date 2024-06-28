const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 3000


app.use(express.json());
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
// setting up routes
app.get('/', (req, res) => {
    res.send('<h1>Migra</h1>')
  })