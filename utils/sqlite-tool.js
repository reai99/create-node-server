const sqlite3 = require("sqlite3").verbose();
const path = require('path');


let db;

const DB_NAME = 'node-scheduler.db';

/**
 * 连接表
 * 
 * @returns 
 */
function connectionSqlite() {
  return new Promise((resolve, reject) => {
    let db_path = path.join(__dirname, `../db/${DB_NAME}`);
    db = new sqlite3.Database(db_path, sqlite3.OPEN_READWRITE, err => {
      if (err) {
        return reject(err);
      }
      console.log("Connected to the your database.");
      resolve("ok");
    });
  });
};

/**
 * 创建表
 * 
 * @param {any} tableName 表明
 * @param {any} fieldsObj {column:datatype...}
 */
exports.creatTable = (tableName, fieldsObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      await connectionSqlite();
  
      let temp = "";
      for (const key in fieldsObj) {
        temp += `${key} ${fieldsObj[key]},`;
      }
      temp = temp.substring(0, temp.length - 1);
  
      console.log(`** createTable ${tableName}`);
      let sql = `CREATE TABLE IF NOT EXISTS ${tableName}  (${temp});`;
      console.log(`createTable sql is ---> ${sql}`);
      db.run(sql, err => {
        if (err) {
          return reject(err);
        }
        // db.close();
        return resolve("ok");
      });
    } catch (error) {
      return reject(error);
    }
  });
};

/**
 *  插入数据
 * 
 * @param {string} tableName 
 * @param {Object} paramsObj {field:value}
 * @returns 
 */
exports.insertData = (tableName, paramsObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      await connectionSqlite();

      let keys = [],
        values = [];
      for (const k in paramsObj) {
        keys.push(k);
        values.push(paramsObj[k]);
      }

      let keysSql = keys.join(",");

      let valuesSql = values.join("','");

      let sql = `INSERT INTO ${tableName}(${keysSql}) VALUES ('${valuesSql}')`;
      console.log(`insert sql is ${sql}`);
      db.run(sql, err => {
        if (err) {
          return reject(err);
        }
        // db.close();
        return resolve("ok");
      });
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * 
 * @param {*} tableName 
 * @param {*} paramsObj 
 * @returns 
 */
exports.deleteData = (tableName, paramsObj = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      await connectionSqlite();
      let sql = `DELETE FROM ${tableName} WHERE id IN (${paramsObj.ids})`;
      console.log(`delete sql is ${sql}`);
      db.run(sql, err => {
        if (err) {
          return reject(err);
        }
        // db.close();
        return resolve("ok");
      });
    } catch (error) {
      // db.close();
      reject(err);
    }
  });
}

exports.updateData = (tableName, paramsObj = {}) => {
  // UPDATE users SET age = 35, name = 'John Doe', email = 'john@example.com' WHERE id = 1;
  return new Promise(async (resolve, reject) => {
    try {
      await connectionSqlite();

      const updArr = [];
      for (const k in paramsObj) {
        if(k === 'id') continue;
        updArr.push(`${k} = ${ typeof paramsObj[k] === 'string' ? "'" + paramsObj[k] + "'" : paramsObj[k]}`);
      }

      let sql = `UPDATE ${tableName} SET ${updArr.join(',')} WHERE id = ${paramsObj.id}`;
      console.log(`update sql is ${sql}`);
      db.run(sql, err => {
        if (err) {
          return reject(err);
        }
        return resolve("ok");
      });
    } catch (error) {
      reject(err);
    }
  });
}

/**
 *  查找数据
 *  
 * @param {string} tableName 
 * @returns 
 */
exports.selectData = tableName => {
  return new Promise(async (resolve, reject) => {
    try {
      await connectionSqlite();
      let sql = `SELECT * FROM ${tableName}`;
      console.log(`select sql is ${sql}`);
      db.all(sql, [], (err, rows) => {
        if (err) {
          return reject(err);
        }
        console.log("rows", rows);
        return resolve(rows);
      });
    } catch (error) {
      // db.close();
      reject(err);
    }
  });
};
