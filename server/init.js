const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const systemConfig = require('./config')

require('./db')

const app = new Koa()
// logger
app.use(logger())
// 解析body
app.use(bodyParser())

// 路由分发
const router = require('./routes')
app.use(router.routes())


module.exports = {
  getInstance: () => app,
  systemConfig,
}