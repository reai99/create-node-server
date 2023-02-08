const fs = require('fs');

fs.readdirSync(__dirname).forEach( item => {
  let filePath = `${__dirname}/${item}/index.js`;
  if (fs.existsSync(filePath)) {
    exports[item] = require(filePath);
  }
});
