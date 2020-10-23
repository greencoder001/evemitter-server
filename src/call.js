const gts = require('./gen-timestamp.js')

module.exports = class Call {
  constructor (id, message, owner, callID) {
    this.callID = id
    this.id = callID
    this.callMsg = message
    this.owner = owner

    this.timeStamp = gts()
  }
}
