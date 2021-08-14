require('dotenv').config()

const { fastify } = require('fastify')
const routes = require('./routes')
const app = fastify({ logger: true })

app.register(routes)

app.listen(process.env.PORT)
