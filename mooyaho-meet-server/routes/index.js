const fastify = require('fastify')
const authRouter = require('./auth')
const meRouter = require('./me')
const meetRouter = require('./meet')
/**
 * @param {fastify.FastifyInstance} fastify
 * */
async function routes(fastify) {
  fastify.register(meRouter, { prefix: '/me' })
  fastify.register(authRouter, { prefix: '/auth' })
  fastify.register(meetRouter, { prefix: '/meet' })
}

module.exports = routes
