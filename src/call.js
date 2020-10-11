const gts = require('./gen-timestamp.js')

module.exports = class Call {
  constructor (id, message, owner) {
    this.callID = id
    this.callMsg = message
    this.owner = owner

    this.timeStamp = gts()
  }
}
