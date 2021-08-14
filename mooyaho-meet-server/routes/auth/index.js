const Router = require('@koa/router')
const authController = require('./auth.ctrl')

const auth = new Router()
auth.post('/register', (ctx) => {})
auth.post('/login', (ctx) => {})

module.exports = router
