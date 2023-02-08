const fs = require("fs");

// 读取所有的控制器模块
fs.readdirSync(__dirname).forEach((item) => {
  const filePath = `${__dirname}/${item}`;
  if (fs.existsSync(filePath) && item !== "index.js") {
    const module = require(filePath);
    const moduleName = item.substring(0, item.lastIndexOf("."));
    exports[moduleName] = module;
  }
});
