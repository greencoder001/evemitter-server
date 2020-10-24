# Evemitter Server
Evemitter Server written in js.

## Install:
Download the latest release from github and unpack it.

## Example:
```sh
node example.js
```

example.js:
```js
const evemitter = require('./main.js')
const fs = require('fs')

const eve = evemitter({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}, fs.readFileSync('example-users.json'), 9912)

```

example-users.json:
```json
{
  "user": "pwd",
  "test": "123456"
}
```
