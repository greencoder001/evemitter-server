const { Evemitter } = require('./src/evemitter.js')

module.exports = (httpsServerOptions, loginData, port = 9912) => {
  return new Evemitter(httpsServerOptions, port, JSON.parse(loginData))
}
