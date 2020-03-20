
const Router = require('koa-router')
class RouterRegister {
  
  constructor() {
    this.router = new Router()
  }
  getRouter () {
    return this.router
  }
  register (path, controllerRouter, middlewares) {
    let args = [path]

    if (middlewares &&
      (
        (Object.prototype.toString.call(middlewares) === '[object Array]' && middlewares.length)
        ||
        Object.prototype.toString.call(middlewares) === '[object Function]'
      )) {
        args = args.concat(middlewares)
      }
    args = args.concat([controllerRouter.routes(),controllerRouter.allowedMethods()])
    // /login -> /user/login -> 再往外层还有basePath/user/login(这一步在该类被实例化时use)
    // this.router.use(path, controllerRouter.routes(),controllerRouter.allowedMethods())
    this.router.use.apply(this.router, args)
  }
}

module.exports = RouterRegister