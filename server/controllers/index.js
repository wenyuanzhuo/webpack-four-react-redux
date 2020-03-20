const path = require('path')
const fs = require('fs')
const Controller = require('./controllerCreator')
const isController = (controllerRouter) => {
  if (!controllerRouter && typeof controllerRouter !== 'object') {
    return false
  }

  if (controllerRouter instanceof Controller) {
    return true
  }

  return false
}

const bindController = (routerRegister, controllerPath) => {
  const stack = [controllerPath]

  while (stack.length) {
    const current = stack.shift()
    const currentfileList = fs.readdirSync(current)
    for (let file of currentfileList) {
      const currentPath = path.join(current, file)
      const isDirectoryInnerControllers = fs.statSync(currentPath).isDirectory()
      if (isDirectoryInnerControllers) {
        stack.push(currentPath)
        continue
      }

      if (file !== 'index.js') {
        continue
      }
      // 一个循环 找到所有require 所需contraoller 再暴露给router 进行use注册
      // currentPath = 'index.js'
      const controllerRouter = require(currentPath)
      if (isController(controllerRouter)) {
        routerRegister.register(controllerRouter.getPath(), controllerRouter.getRouter(), controllerRouter.getMiddleware())
      }
    }
  }

}

module.exports = {
  bind(routerRegister) {
    const currPath = path.join(__dirname)
    bindController(routerRegister, currPath)
  }
}

