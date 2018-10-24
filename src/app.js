const Koa = require('koa');

// 创建一个Koa对象表示web app本身:
const app = new Koa();
const fs = require('fs');
const path = require('path');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
// 对于任何请求，app将调用该异步函数处理请求：
// router.get('/img/:name', async(ctx, next) => {
//     const url = ctx.params.name
//     console.log(url)
//     fs.writeFile(path.resolve(__dirname, 'assets/img.txt'), url, function(err) {
//         if (err) {
//             throw err;
//         }
//     })
//     next()
// })
router.post('/test', async(ctx, next) => {
    const url = ctx.request.body
    console.log(url)
    fs.writeFile(path.resolve(__dirname, 'assets/img.txt'), url, function(err) {
        if (err) {
            throw err;
        }
    })
})
app.use(bodyParser());
app.use(router.routes());
// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');