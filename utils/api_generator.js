const colors = require('colors-console')
const { request } = require('./http');
const requestType = require('../apiConfig/requestType');
const { generateToken, parseToken } = require('./token_utils');

// 参数处理
const payloadProcess = (ctx) => {
  const _m_ = ctx.query._m_ || 'none';
  const reqC = requestType[_m_];
  if(reqC) {
    reqC.data = ctx.request.body || {};
    reqC.params = ctx.request.query || {}
  };

  return reqC || {};

}


const apiDecorator = async (ctx, config = {}) => {

  const temp = payloadProcess(ctx);

  config.url = config.url || temp.uri;
  config.method = (config.method || temp.method || 'get').toLocaleLowerCase();
  config.data = config.data || temp.data;
  config.params = config.params || temp.params;
  
  if(!config.url) {
    return ctx.body = {
      errCode: 404,
      errMsg: '找不到当前配置地址，请确认后重试'
    }
  }

  const name = config.name || config.params._m_;
  delete config.params._m_;

  // 生成token 用于鉴权
  const user = parseToken(ctx.cookies.get("token"));
  const token = generateToken(user);
  config.headers = config.headers || { Authorization: token };

  // 处理地址{}参数替换为（params > data）参数
  config.url = config.url.replace(/\{([a-zA-Z0-9]+)\}/g, (match, name) => {
    return config.params[name] || config.data[name] || '';
  });

  console.log(colors('green', `/******************** ${name} send to server ***********************/`));
  console.log(JSON.stringify(config));

  try {
    const result = await request(config);
    console.log(colors('green', `/********************  ${name} send to server result ***********************/`));
    console.log(JSON.stringify(result.data));
    ctx.body = result.data;
  } catch (error) {
    console.log(colors('red', `/******************** ${name} send to server error ***********************/`));
    console.log(JSON.stringify(error));
    ctx.body = { code: '-1', msg: error.message };
  }

}

module.exports = apiDecorator