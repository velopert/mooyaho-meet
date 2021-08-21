const { Mooyaho } = require('mooyaho-server-sdk')

const mooyaho = new Mooyaho(
  'http://localhost:8080',
  'ec24c791f058b01abccc8e3c5e8cd50b'
)

module.exports = mooyaho
