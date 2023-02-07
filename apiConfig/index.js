const fs = require('fs');

const apiConfig = {};

fs.readdirSync(`${__dirname}`).forEach(item => {
  const filePath = `${__dirname}/${item}`
  if (fs.existsSync(filePath) && item !== 'index.js') {
    const module = require(filePath);
    const moduleName = item.substring(0, item.lastIndexOf('.'));
    console.log(module)
    apiConfig[moduleName] = module;

  }
})

exports.apiConfig = apiConfig;