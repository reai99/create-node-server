const send = require('koa-send');
const minimatch = require('minimatch');

const CACHE_STATIC_PATH = {};

const matchFilePath = (match, path) => {

  if(CACHE_STATIC_PATH[path]) return path;

  const type = typeof match;

  switch(type) {
    case 'string':
      if(minimatch(path, match)) {
        CACHE_STATIC_PATH[path] = 1;
        return path;
      }
      break;
    case 'object':
      for(let i = 0, length = match.length; i < length; i++) {
        if(minimatch(path, match[i])){
          CACHE_STATIC_PATH[path] = 1;
          return path;
        }
      }
    break;
    default: break;
  }
  
  return false;
}

module.exports = function static(match, options) {
  return async (ctx, next) => {
    const curUrl = ctx.path;
    
    let fileUrl = matchFilePath(match, curUrl);

    if (!fileUrl) {
      return await next();
    }
    
    await send(ctx, curUrl, { root: options.dir, maxage: options.maxage });
  }
}