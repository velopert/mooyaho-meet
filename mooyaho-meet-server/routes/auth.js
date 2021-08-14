const fastify = require('fastify')
/**
 * @param {fastify.FastifyInstance} fastify
 * */
async function authRouter(fastify) {
  fastify.post('/register', async (request, reply) => {
    const { username, password } = request.body
  })
  fastify.post('/login', (request, reply) => {})
  fastify.post('/integrate', (request, reply) => {})
  fastify.post('/integrate-guest', (request, reply) => {})
}

module.exports = authRouter
