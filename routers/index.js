const router = require('koa-router')();

router.get('/(.*)', async function (ctx) {
  await ctx.render('index', { 
    title: '测试项目',
    env: process.env.CONFIG_ENV
  });
});

module.exports = router;
