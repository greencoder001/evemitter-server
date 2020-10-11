const https = require('https')

class Evemitter {
  constructor (hso, port) {
    this.server = new EvemitterServer(hso, port)
  }
}

class EvemitterServer {
  constructor (hso, port) {
    this.server = https.createServer(hso, (req, res) => {
      res.writeHead(200, { 'Content-Type': 'application/json' })

      const path = req.url.replace('/', '').split('/')
      const login = {
        user: path[0],
        pwd: path[1]
      }

      const method = path[2]

      res.end()
    }).listen(port)
  }
}

module.exports = { Evemitter, EvemitterServer }
