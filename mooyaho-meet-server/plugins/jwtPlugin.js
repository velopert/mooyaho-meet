const { default: fp } = require('fastify-plugin')
const { verifyToken } = require('../lib/tokens')

const jwtPlugin = fp(
  async (fastify, opts) => {
    fastify.decorateRequest('user', null)
    fastify.addHook('preHandler', async (request, reply) => {
      const token = request.headers['authorization']?.split('Bearer ')[1]
      if (!token) return
      try {
        const decoded = await verifyToken(token, process.env.JWT_SECRET)
        request.user = decoded.user
      } catch (e) {
        console.error(e)
      }
    })
  },
  {
    name: 'jwtPlugin',
  }
)

module.exports = jwtPlugin
