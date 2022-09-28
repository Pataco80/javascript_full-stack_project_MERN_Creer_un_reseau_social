const express = require('express')
require('dotenv').config({ path: './config/.env' })
require('./config/db')
const userRoutes = require('./routes/user.routes')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
// Routes
app.use('/api/user', userRoutes)
app.get('/', (req, res) => {
  res.send('Hello World!')
})
// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port http://localhost:${process.env.PORT}`)
})
