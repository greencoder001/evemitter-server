const evemitter = require('./main.js')
const fs = require('fs')

const eve = evemitter({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}, fs.readFileSync('example-users.json'), 9912)
