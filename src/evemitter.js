const https = require('https')

// const sleep = function (ms) { return new Promise((resolve) => { setTimeout(resolve, ms) }) }

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
    this.currentCallID = 0
    this.userCallIDS = {}
    this.loginData = loginData
    this.server = https.createServer(hso, (req, res) => {
      res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })

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
          res.write(this.call(argv, login))
        } else if (method === 'calls') {
          res.write(this.getCalls(login))
        }
      }

      res.end()
    }).listen(port)
  }

  call ([id, msg], { user }) {
    this.currentCallID += 1
    var call
    try {
      call = new EvemitterCall(id, atob(msg), user, this.currentCallID - 1)
    } catch {
      return JSON.stringify({
        code: 2,
        msg: 'Invalid Request',
        solve: 'Check your request'
      })
    }
    console.log(`Call from ${user} with id ${id}`)
    this.calls.push(call)
    return JSON.stringify({
      code: 1,
      msg: 'All OK, executed request',
      solve: 'Nothing to solve'
    })
  }

  getCalls ({ user }) {
    const p = this
    // OLD: return JSON.stringify(this.calls)
    this.userCallIDS[user] = typeof this.userCallIDS[user] !== 'number' ? 0 : this.userCallIDS[user]
    const calls = this.calls.filter(function (item) {
      const { id } = item

      return id >= p.userCallIDS[user]
    })

    const newestID = calls[calls.length - 1] === undefined ? this.userCallIDS[user] : calls[calls.length - 1].id + 1
    this.userCallIDS[user] = newestID

    return JSON.stringify(calls)
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
