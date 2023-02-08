const fs = require('fs');

//读取api配置
const apiConfig = {};

fs.readdirSync(`${__dirname}`).forEach(item => {
  const filePath = `${__dirname}/${item}`
  if (fs.existsSync(filePath) && item !== 'index.js') {
    const module = require(filePath);
    const moduleName = item.substring(0, item.lastIndexOf('.'));
    for(let key in module) {
      const { method, uri } = module[key];
      Object.keys(apiConfig).forEach(k => {
        if(apiConfig[k].method === method && apiConfig[k].uri === uri) {
          throw new Error(`${k}与${key}配置的后台请求地址相同，请检查是否可以重用`);
        }
      })
      exports[key] = module[key];
    }
  }
})