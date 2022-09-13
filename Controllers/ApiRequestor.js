const axios = require('axios')

class ApiRequestor {
  static get(url, server_key, data_hash) {
    return this.remoteCall(url, server_key, data_hash, false);
  }

  static post(url, server_key, data_hash) {
    return this.remoteCall(url, server_key, data_hash, true);
  }

  static async remoteCall(url, server_key, data_hash, post = true) {
    try {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Basic " + Buffer.from(server_key + ":").toString('base64')
      }

      let body = JSON.stringify(data_hash);
      let result;
      if (post) {
        result = await axios.post(url, body, { headers: headers })
      } else {
        result = await axios.get(url, body, { headers: headers })
      }
      return result;
    } catch (error) {
      console.log(error);
    }

  }
}

module.exports = ApiRequestor;