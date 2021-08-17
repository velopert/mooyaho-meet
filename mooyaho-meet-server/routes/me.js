const fastify = require('fastify')
/**
 * @param {fastify.FastifyInstance} fastify
 * */
async function meRouter(fastify) {
  fastify.get('/', (request, reply) => {
    return request.user
  })
}

module.exports = meRouter
