const fastify = require('fastify')
/**
 * @param {fastify.FastifyInstance} fastify
 * */
async function meRouter(fastify) {
  fastify.get('/', (request, reply) => {
    reply.send('Hello World')
  })
}

module.exports = meRouter
