const path = require('path');
const Koa = require('koa');
const jwt = require('koa-jwt');
const { koaBody } = require('koa-body');
const logger = require('koa-logger');
const views = require('koa-views');
const router = require('./routers');

const app = new Koa();

const Secret = 'shared-secret';
const port = '7001';


// 异常捕获处理
app.use((ctx, next) => {
  return next().then(() => {
    const token = ctx.cookies.get('token');
    if (token) {
      ctx.cookies.set('token', token, { httpOnly: true, overwrite: true, maxAge:  12 * 3600 * 1000 });
    }
  }).catch(err => {
    // 验证
    if(err.status === 401) {
      ctx.status = 401;
      ctx.body = '没有权限，请登'
    } else {
      throw err;
    }
  })
})

// jwt鉴权
// app.use(jwt({ secret: Secret }).unless({ path: [/^\/public/] }));

// 控制台日志
app.use(logger());

// 模板
app.use(views(path.join(__dirname, './template'), { map: {html: 'swig'}}));
// 文件上传需要
app.use(koaBody({multipart: true})); 
//路由
app.use(router.routes());


app.listen(port);
console.log('Server listen in:' + port);



