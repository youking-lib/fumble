const express = require('express')
const https = require('https')
const http = require('http')
const path = require('path')
const fs = require('fs')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(function (req, res, next) {
  res.set({
    'Connection': 'close'
  })

  next()
})

app.use('/public', express.static(path.join(__dirname, 'static')))

app.get('/', function(req, res) {
  res.render('index')
})

const port = { http: 8086, https: 8087 }
const httpsOptions = {
  key: fs.readFileSync('./certificate/private.pem'),
  cert: fs.readFileSync('./certificate/certificate.crt')
}

console.log(httpsOptions)

const httpServer = http.createServer(app)
const httpsServer = https.createServer(httpsOptions, app)

httpServer.listen(port.http, function () {
  console.log('HTTP Server start at port: ' + port.http)
})

httpsServer.listen(port.https, function () {
  console.log('HTTPS Server start at port: ' + port.https)
})
