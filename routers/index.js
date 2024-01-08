const router = require('koa-router')();

const Controler = require('../controller');
const apiDecorator = require('../utils/api_generator');

router.all('/api/common/template/download', Controler['common'].templateDownload);
router.all('/api/common/import', Controler['common'].importProcess);
router.all('/api/common/download', Controler['common'].downloadProcess);

router.get('/api/login', Controler['validate'].login);
router.get('/api/logout', Controler['validate'].logout);

router.all('/api/common/stream', Controler['common'].streamProcess)

router.all('/api/process', async function(ctx) {
  await apiDecorator(ctx)
});

router.post('/api/common/scheduler/select_task', Controler['scheduler'].selectTask)
router.post('/api/common/scheduler/add_task', Controler['scheduler'].addTask);
router.get('/api/common/scheduler/del_task', Controler['scheduler'].delTask);
router.post('/api/common/scheduler/upd_task', Controler['scheduler'].updTask);

// 接口访问
router.all('/api/(.*)', async function (ctx) {
  ctx.body = { code : -1, msg: '没有找到对应的接口' }
});

// 页面访问
router.get('/(.*)', async function (ctx) {
  await ctx.render('index', { 
    title: '测试项目',
    env: process.env.CONFIG_ENV
  });
});



module.exports = router;
