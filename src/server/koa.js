const http = require('http')
const m1 = async (ctx, next) => {
  ctx.res.write('<p>line 1</p>')
  next()
  // res.end()
}
const m2 = async (ctx, next) => {
  ctx.res.write('<p>line 2</p>')
  // res.end()
}
const middlewares = [ m1, m2 ]

function createContext(req, res) {
  let context = Object.create({});
  context.req = req;
  context.res = res;
  return context;
}
function compose(middleware) {
  return function (ctx) {
    function dispatch(i) {
      let fn = middleware[i];
      if (!fn) {
        return
      }
      try {
        return Promise.resolve(fn(ctx, () => {
          return dispatch(i + 1)
        }))
      } catch (err) {
        return Promise.reject(err)
      }
    }
    return dispatch(0)
  }
}
const router = async (req, res) => {
  // middlewares.forEach(cb => {
  //   cb(req, res)
  // })
  const ctx = createContext(req, res)
  await compose(middlewares)(ctx)
  ctx.res.end()
}
const server = http.createServer(router)

server.listen(3001, () => {
  process.stdout.write('app started at port 3001...');
})