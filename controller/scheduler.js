const sqliteTool = require('../utils/sqlite-tool');

module.exports = {
  async selectTask(ctx) {
    const res = await sqliteTool.selectData('cornJobs');
    ctx.body = res;
  },
  async addTask(ctx) {
    const data = ctx.request.body;
    try {
      await sqliteTool.insertData('cornJobs',data);
      ctx.body = {
        code: 200,
        message: '新增成功',
      }
    } catch (error) {
      ctx.body = {
        code: -1,
        message: '插入数据异常，请稍后重试',
      }
    }
  },
  async updTask(ctx) {
    const data = ctx.request.body;
    try {
      await sqliteTool.updateData('cornJobs',data);
      ctx.body = {
        code: 200,
        message: '更新成功',
      }
    } catch (error) {
      ctx.body = {
        code: -1,
        message: error || '更新数据异常，请稍后重试',
      }
    }
  },
  async delTask(ctx) {
    const params = ctx.request.query || {};
    if(!params.ids) {
      return ctx.body = {
        code: -1,
        message: 'ids参数不能为空'
      }
    }
    try {
      await sqliteTool.deleteData('cornJobs', params);
      ctx.body = {
        code: 200,
        message: '删除成功',
      }
    } catch (error) {
      ctx.body = {
        code: -1,
        message: '删除数据异常，请稍后重试'
      }
    }
  }
}