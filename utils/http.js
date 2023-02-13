const axios  = require('axios');

const request = (config = {}) => {
  return new Promise((resolve, reject) => {
    axios({
      timeout: 180000000,
      ...config,
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err);
    })
  })
}

module.exports = {
  request,
}

