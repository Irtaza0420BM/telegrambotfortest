const {handler} = require("./index")

const base_url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/`


exports.posttelCommunicate = async (req, res) => {
    const update = req.body;
    console.log(update)
    const response = await handler(update)
}

exports.gettelCommunicate= async(req, res)=> {
    res.send("ok")
}

//need this function for first Run
// exports.webHook = async (req, res) => {

//     const webhookUrl = `https://${process.env.VERCEL_URL}/`; // Vercel's URL with an extra / to get result at / route :D 
  
//     try {
//         res.send( `${base_url}setWebhook?url=${webhookUrl}`);
//     } catch (error) {
//         console.error(error);
//     }
// }