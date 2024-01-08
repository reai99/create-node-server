var sqliteTool = require('../utils/sqlite-tool');

// 创建表
async function createTable() {
  console.log("** Begin Create Table cornJobs ...");
  try {
    let cornJobsModel = {
      id: "INTEGER PRIMARY KEY",
      jobName: "NVARCHAR(100)",
      jobRule: "VARCHAR(255)",
      requestUrl: "VARCHAR(255)",
      requestMethod: "VARCHAR(100)",
      requestHeaders: "NVARCHAR(200)",
      requestParams: "NVARCHAR(200)",
      description: "NVARCHAR(150)",
      created: "INTEGER",
      updated: "INTEGER"
    };
    await sqliteTool.creatTable("cornJobs", cornJobsModel);

    console.log("** Begin Create Table history ...");
    let historyModel = {
        id: "INTEGER PRIMARY KEY",
        jobId: "INTEGER",
        content: "NVARCHAR(500)",
        created: "INTEGER",
        updated: "INTEGER"
      };
      await sqliteTool.creatTable("history", historyModel);
  } catch (err) {
    console.log("err===>", err);
    process.exit(1)
  }
}

async function instertData() {
  console.log("** instert data cornJobs ...");
  try{
    let cornJobsModel = {
      jobName: "测试任务",
      jobRule: "测试规则",
      requestUrl: "http://api.wangruirui.cn",
      requestMethod: "POST",
      requestHeaders: "",
      requestParams: JSON.stringify({a:1}),
      description: "测试描述",
      created: "1515052580626",
    };
    await sqliteTool.insertData('cornJobs',cornJobsModel)

  } catch(err) {
    console.log("err===>", err);
    process.exit(1)
  }

  console.log("** instert data history ...");
  try{
    let historyModel = {
      jobId: "1",
      content: "测试内容",
      created: "1515052725568",
    };
    await sqliteTool.insertData("history", historyModel);

  } catch(err) {
    console.log("err===>", err);
    process.exit(1)
  }

}


function start () {
    // createTable();
    instertData();
}

start();