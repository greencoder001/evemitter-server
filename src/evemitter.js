const https = require('https')

const { atob } = require('./base64.js')
const EvemitterCall = require('./call.js')

class Evemitter {
  constructor (hso, port, loginData) {
    this.server = new EvemitterServer(hso, port, loginData)
  }
}

class EvemitterServer {
  constructor (hso, port, loginData) {
    this.calls = []
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

        const argv = path.slice(3)

        if (method === 'call') {
          this.call(argv, login)
        }
      }

      res.end()
    }).listen(port)
  }

  call ([id, msg], { user }) {
    const call = new EvemitterCall(id, atob(msg), user)
    console.log(`Call from ${user} with id ${id}: `, call)
    this.calls.push(call)
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
