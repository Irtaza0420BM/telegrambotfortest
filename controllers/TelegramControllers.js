const {handler} = require("./index")

const base_url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/`

exports.webHook = async (req, res) => {

    const webhookUrl = `https://${process.env.VERCEL_URL}/`; // Vercel's URL with an extra / to get result at / route :D 
  
    try {
        res.send( `${base_url}setWebhook?url=${webhookUrl}`);
    } catch (error) {
        console.error(error);
    }
}

exports.posttelCommunicate = async (req, res) => {
    const update = req.body;
    const response = await handler(update)
    res.send("ok")
}

exports.gettelCommunicate= async(req, res)=> {
    console.log(req.body)
    res.send("ok")
}