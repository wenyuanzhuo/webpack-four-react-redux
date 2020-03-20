const model = require('../../models')
const userinfo = async (ctx) => {
  const { username, password } = ctx.request.query
  console.log(ctx.request.query)
  const UserModel = model.UserModel
  const user = await UserModel.find({
    username,
  }, 'username password').then((user) => {
    console.log(user)
    return user
  })
  ctx.body = {
    status: 0,
    data: {
      user,
    }
  }
}
const login = async (ctx) => {
  const { username, password } = ctx.request.body
  const UserModel = model.UserModel
  const user = new UserModel({
    username,
    password,
  })
  user.save((err) => {
    if (err) {
      ctx.body = {
        status: 1,
        err,
      }
    }
  })
  ctx.body = {
    status: 0,
    data: { username, password }
  }
}
module.exports = {
  userinfo,
  login
}