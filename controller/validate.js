
const { generateToken, parseToken } = require('../utils/token_utils');

module.exports = {
  async login(ctx) {
    const { name: username } = ctx.request.query || {};
    if(!username) {
      ctx.body = { code: -1, msg: '请传入name参数进行登陆'}
      return;
    }
    const token = generateToken(username);
    ctx.cookies.set('token', token, { httpOnly: true, overwrite: true, maxAge:  12 * 3600 * 1000 });
    ctx.redirect('/');
  },
  async logout(ctx) {
    ctx.cookies.set('token', '');
    ctx.body = {code: 1, msg: '退出成功'}
    return;
  }
}