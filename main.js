const { Evemitter } = require('./src/evemitter.js')

module.exports = (httpsServerOptions, port = 9912) => {
  return new Evemitter(httpsServerOptions, port)
}
