const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const systemConfig = require('./config')

require('./db')

const app = new Koa()
// logger
// 解析body
app.use(bodyParser())

// 路由分发
const router = require('./routes')
app.use(router.routes())

const appPort = systemConfig.port || 8080
app.listen(appPort, () => console.log(`🏎  listening on port ${appPort}`))