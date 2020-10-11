const https = require('https')

class Evemitter {
  constructor (hso, port, loginData) {
    this.server = new EvemitterServer(hso, port, loginData)
  }
}

class EvemitterServer {
  constructor (hso, port, loginData) {
    this.loginData = loginData
    this.server = https.createServer(hso, (req, res) => {
      res.writeHead(200, { 'Content-Type': 'application/json' })

      const path = req.url.replace('/', '').split('/')
      const login = {
        user: path[0],
        pwd: path[1]
      }

      if (!this.mayAccess(login)) {
        return res.end(JSON.stringify({
          code: 0,
          msg: 'Invalid login',
          solve: 'Enter valid login data'
        }))
      } else {
        const method = path[2] || 'call'
      }

      res.end()
    }).listen(port)
  }

  mayAccess (login) {
    try {
      const pw = this.loginData[login.user]

      if (typeof pw !== 'string') {
        return false
      }

      return login.pwd === pw
    } catch {
      return false
    }
  }
}

module.exports = { Evemitter, EvemitterServer }
