const axios = require("axios")
const base_url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/`


setWebhook = async (req, res) => {

  const webhookUrl = `https://${process.env.VERCEL_URL}/`; // Vercel's URL with an extra / to get result at / route :D 

  try {
      const response = await axios.get(`${base_url}/setWebhook?url=${webhookUrl}`);
      res.send(response.data, `${base_url}/setWebhook?url=${webhookUrl}`);
  } catch (error) {
      console.error(error);
  }
};

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

module.exports = {axiosInstance: getaxiosInstance(), setWebhook}