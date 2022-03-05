require('dotenv').config()
const express = require('express')
const cleanUp = require('node-cleanup')
const routes = require('./routes.js')
const whatsapp = require('./whatsapp.js')

const app = express()
const host = process.env.HOST ?? '127.0.0.1'
const port = parseInt(process.env.PORT ?? 8000)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/', routes)

app.listen(port, host, () => {
    whatsapp.init()
    console.log(`Server is listening on http://${host}:${port}`)
})

cleanUp(whatsapp.cleanup)

module.exports = app
