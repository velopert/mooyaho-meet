const fastify = require('fastify')
const db = require('../db')
const bcrypt = require('bcrypt')

/**
 * @param {fastify.FastifyInstance} fastify
 * */
async function authRouter(fastify) {
  fastify.post('/register', async (request, reply) => {
    const { username, password } = request.body
    // check username exists
    const exists = await db.user.findUnique({ where: { username } })
    if (exists) {
      reply.status(409)
      throw new Error('Username already exists')
    }
    const hash = await bcrypt.hash(password, 10)
    const user = await db.user.create({
      data: {
        username,
        passwordHash: hash,
      },
      select: {
        id: true,
        username: true,
      },
    })
    return user
  })
  fastify.post('/login', async (request, reply) => {
    const { username, password } = request.body
    const user = await db.user.findUnique({ where: { username } })
    if (!user) {
      reply.status(401)
      throw new Error('Login failed')
    }
    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if (isMatch) {
      const { id, username } = user
      return { id, username } // @todo return token
    }
    reply.status(401)
    throw new Error('Login failed')
  })
  fastify.post('/integrate', (request, reply) => {})
  fastify.post('/integrate-guest', (request, reply) => {})
}

module.exports = authRouter
