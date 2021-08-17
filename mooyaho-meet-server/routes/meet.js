const fastify = require('fastify')
const { Mooyaho } = require('mooyaho-server-sdk')
const db = require('../db')

const mooyaho = new Mooyaho(
  'http://localhost:8080',
  'ec24c791f058b01abccc8e3c5e8cd50b'
)

/**
 * @param {fastify.FastifyInstance} fastify
 * */
async function meetRouter(fastify) {
  fastify.post('/', async (request, reply) => {
    const code = request.body.code.toLowerCase().replace(/[^a-z0-9]/g, '')

    // check code exists
    const exists = await db.meet.findUnique({
      where: {
        code,
      },
    })

    if (exists) {
      reply.status(409)
      throw new Error('Meet with same code already exists')
    }

    const { id: channelId } = await mooyaho.createChannel()
    const meet = await db.meet.create({
      data: {
        channelId,
        code,
      },
    })

    return {
      id: meet.id,
      code,
      channelId,
    }
  })
  fastify.get('/:code', async (request, reply) => {
    const { code } = request.params
    const meet = await db.meet.findUnique({
      where: {
        code,
      },
    })
    if (!meet) {
      reply.status(404)
      throw new Error('Meet not found')
    }
    return meet
  })
}

module.exports = meetRouter
