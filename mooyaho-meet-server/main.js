require('dotenv').config()

const { fastify } = require('fastify')
const jwtPlugin = require('./plugins/jwtPlugin')
const routes = require('./routes')
const app = fastify({ logger: true })

app.register(jwtPlugin)
app.register(routes)

app.listen(process.env.PORT)
