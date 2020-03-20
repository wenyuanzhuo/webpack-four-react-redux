const Koa = require('koa');

// 创建一个Koa对象表示web app本身:
const app = new Koa();
const fs = require('fs');
const path = require('path');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const jsonp = require('./middleware/jsonp')
const view = require('./middleware/view')

router.get('/test', async(ctx, next) => {
    ctx.request.query = { 
        name: 'aaron'
    }
    next()
})
jsonp(app, {})
view(app, {
    baseDir: path.resolve(__dirname, 'txt/'),
})
app.use(bodyParser());
app.use(async (ctx, next) => {
    await ctx.view({
        file: `${ctx.path}.html`,
    })
})
// app.use(router.routes());
// app.use(async ctx => {
//     await ctx.jsonp({
//         data: 'test demo',
//         success: true,
//     })
// })
// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');