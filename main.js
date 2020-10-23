const { Evemitter } = require('./src/evemitter.js')

module.exports = (httpsServerOptions, loginData, port = 9912) => {
  try {
    return new Evemitter(httpsServerOptions, port, JSON.parse(loginData))
  } catch {
    return new Evemitter(httpsServerOptions, port, loginData)
  }
}
