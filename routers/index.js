const router = require('koa-router')();

const Controler = require('../controller');
const apiDecorator = require('../utils/api_generator');

router.all('/api/common/template/download', Controler['common'].templateDownload);
router.all('/api/common/import', Controler['common'].importProcess);
router.all('/api/common/download', Controler['common'].downloadProcess);

// 页面访问
router.get('/(.*)', async function (ctx) {
  await ctx.render('index', { 
    title: '测试项目',
    env: process.env.CONFIG_ENV
  });
});

module.exports = router;
