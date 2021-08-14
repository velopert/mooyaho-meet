const Router = require('@koa/router')
const meController = require('./me.ctrl')

const me = new Router()

me.get('/', (ctx) => {})

module.exports = me
