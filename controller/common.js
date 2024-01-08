const fs = require("fs");
const path = require("path");
const superagent = require("superagent");
const { PassThrough } = require('stream');

const requestType = require('../apiConfig');
const { generateToken, parseToken } = require('../utils/token_utils');

module.exports = {
  // 模板下载
  async templateDownload(ctx) {

    const { ident, filename = "模板.xlsx" } = ctx.request.query;

    if(!ident) {
      ctx.body = { code: 1, msg: "参数有误，请检查或联系开发者" };
      return;
    }

    try {
      const file = fs.readFileSync(path.resolve(__dirname, `../public/templates/${ident}`));
      ctx.type = "application/octet-stream";
      ctx.set({"content-disposition": `form-data; name="attachment"; filename="${encodeURIComponent(filename)}"`});
      ctx.body = file;
    } catch (error) {
      ctx.body = { code: 1, msg: "参数有误，没有找到对应文件" };
    }


  },
  // 导出文件
  async downloadProcess(ctx) {

    const query = ctx.query || {};

    const { uri, method } = requestType[query["_m_"]] || {};

    if (!method || !uri) {
      ctx.body = { code: 1, msg: "参数有误，请检查或联系开发者" };
      return;
    }

    const type = method.toLocaleLowerCase() || "get";
    const payload = ctx.request.body.data || {};
    const params = ctx.request.body.params || {};

    delete query["_m_"];

    // 生成token
    const user = parseToken(ctx.cookies.get("token"));
    const token = generateToken(user);

    const ret = await new Promise((resolve, reject) => {
      superagent[type](uri)
        .query(params)
        .send(payload)
        .set("Authorization", token)
        .timeout({ response: 18000000, deadline: 18000000 })
        .accept("application/octet-stream")
        .parse((res, callback) => {
          res.setEncoding("binary");
          res.data = "";
          res.on("data", chunk => res.data += chunk);
          res.on("end", function () {
            if ( res.headers["content-type"] && res.headers["content-type"].indexOf("application/json") > -1) {
              const buf = new Buffer(res.data, "binary");
              callback(JSON.parse(buf.toString()));
            } else {
              callback(null, new Buffer(res.data, "binary"));
            }
          });
        })
        .buffer()
        .end(function (err, result) {
          if (err) reject(null);
          resolve(result);
        });
    });
    if (ret) {
      ctx.body = ret.body;
    } else {
      ctx.body = { code: 1, msg: "参数有误，请检查或联系开发者" };
    }
  },
  // 导入
  async importProcess(ctx) {
    const queries = ctx.query;
    const { fields, files, params } = ctx.request.body;
    const { file } = files || {};

    const { uri } = requestType[queries["_m_"]] || {};

    if (!file || !uri) {
      ctx.body = { status: 1, msg: "参数有误，请检查或联系开发者" };
      return;
    }

    // 生成token
    const user = parseToken(ctx.cookies.get("token"));
    const token = generateToken(user);

    const formData = {
      file: {
        value: fs.createReadStream(file.path),
        options: {
          filename: file.name,
          contentType: file.type,
        },
      },
    }

    for (let key in fields) {
      formData[key] = fields[key];
    }

    const ret = await new Promise((resolve, reject) => {
      superagent
      .post(uri)
      .set('Content-Type', 'multipart/form-data')
      .set("Authorization", token)
      .send(formData)
      .query(params)
      .end(function (err, result) {
        if (err) reject(null);
        resolve(result);
      });
    });

    ctx.body = JSON.parse(ret);
    
  },
  // 流式输出
  streamProcess(ctx) {
    ctx.set({
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream; charset=utf-8',
    });

    const stream = new PassThrough();

    ctx.body = stream;
    ctx.status = 200;

    const data = ['  ', 'Hello', ' ', 'Reai', ' ','！',].map(c => c.split("")).flat(10);

    const timer = setInterval(() => {
      stream.write(data.shift());
      if(data.length === 0) {
        clearInterval(timer); 
        stream.end();
      }
    }, 400)

  },

};
