

class Controller {
  constructor(path, router, middleware) {
    this.path = path
    this.router = router
    this.middleware = middleware
  }
  getRouter () {
    return this.router
  }
  getPath () {
    return this.path
  }
  getMiddleware () {
    return this.middleware
  }
}

Controller.factory = (path, router, middleware) => {
  return new Controller(path, router, middleware)
}

module.exports = Controller