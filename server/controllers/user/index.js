const Router = require('koa-router')
const UserController = require('./user.controller')
const Controller = require('../controllerCreator')
const router = new Router()

router.get('/info', UserController.userinfo)
router.post('/login', UserController.login)
module.exports = Controller.factory('/user', router)