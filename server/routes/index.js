const Router = require('koa-router')
const RouterRegister = require('./register')
const systemConfig = require('../config')
const controller = require('../controllers')
const basePath = (systemConfig.system && systemConfig.system.base) || ''
const rootRouter = new Router()

/**
 * var forums = new Router();
 * var posts = new Router();
 
 * posts.get('/', (ctx, next) => {...});
 * posts.get('/:pid', (ctx, next) => {...});
 * 以下就是bind的作用
 * forums.use('/forums/:fid/posts', posts.routes(), posts.allowedMethods());
 * root.use('/basePath', forums.routes(), forums.allowedMethods());
 */
const routerRegister = new RouterRegister()
// 新增路由 只需修改controller层代码
controller.bind(routerRegister)

const apiRouter = routerRegister.getRouter()

rootRouter.use(`${basePath}/api`, apiRouter.routes(), apiRouter.allowedMethods())

module.exports = rootRouter