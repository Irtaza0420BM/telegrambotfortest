const axios = require("axios")
const base_url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/`


function getaxiosInstance() {
  return {
    get(method, params) {
      console.log("Data is sent to the server");
      return axios.get(`${base_url}${method}`, {
        params,
      });
    },
    post(method, data) {
      return axios({
        method: "post",
        url: `${base_url}${method}`,  // Ensure full URL is used
        data,  // The data to be sent with the request
      });
    }
  };
}

module.exports = {axiosInstance: getaxiosInstance()}