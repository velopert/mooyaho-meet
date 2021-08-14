const fastify = require('fastify')
/**
 * @param {fastify.FastifyInstance} fastify
 * */
async function meetRouter(fastify) {
  fastify.post('/', (request, reply) => {})
  fastify.get('/:id', (request, reply) => {})
}

module.exports = meetRouter
