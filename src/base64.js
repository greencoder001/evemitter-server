exports.atob = (text) => {
  return Buffer.from(text, 'base64').toString('utf-8')
}

exports.btoa = (text) => {
  return Buffer.from(text).toString('base64')
}
