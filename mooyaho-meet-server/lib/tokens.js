const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET
exports.generateToken = async function generateToken(data, options = {}) {
  return new Promise((resolve, reject) => {
    jwt.sign(data, JWT_SECRET, options, (err, token) => {
      if (err) {
        reject(err)
        return
      }
      resolve(token)
    })
  })
}

exports.verifyToken = async function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err)
        return
      }
      resolve(decoded)
    })
  })
}
