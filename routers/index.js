const router = require('koa-router')();

const Controler = require('../controller');
const apiDecorator = require('../utils/api_generator');
const { generateToken, parseToken } = require('../utils/token_utils');

router.all('/api/common/template/download', Controler['common'].templateDownload);
router.all('/api/common/import', Controler['common'].importProcess);
router.all('/api/common/download', Controler['common'].downloadProcess);

router.get('/api/login', async function(ctx){
  const { name: username } = ctx.request.query || {};
  if(!username) {
    ctx.body = { code: -1, msg: '请传入name参数进行登陆'}
    return;
  }
   const token = generateToken(username);
  ctx.cookies.set('token', token, { httpOnly: true, overwrite: true, maxAge:  12 * 3600 * 1000 });
  ctx.redirect('/');
})

// 页面访问
router.get('/(.*)', async function (ctx) {
  await ctx.render('index', { 
    title: '测试项目',
    env: process.env.CONFIG_ENV
  });
});

module.exports = router;
