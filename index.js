const express = require('express')
const app = express()
const { port, dbURI } = require('./config/environment')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const router = require('./config/routes')
const cors = require('cors')

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true  },
  (err) => {
    if (err) return console.log(err)
    console.log('Mongo is Connected!')
  })

app.use(cors())

app.use(express.static(`${__dirname}/frontend/build`))

app.use(bodyParser.json())

app.use('/api', router)

app.use('/*', (req, res) => res.sendFile(`${__dirname}/frontend/build/index.html`))

app.listen(port, () => console.log(`Up and running on port ${port}`))