const Router = require('@koa/router')
const meetController = require('./meet.ctrl')

const meet = new Router()

meet.get('/:id', (ctx) => {})
meet.post('/', (ctx) => {})

module.exports = me
