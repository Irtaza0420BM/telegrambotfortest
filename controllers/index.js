const { handleMessage } = require("./lib/telegram");

async function handler(body, method) {

    if (body?.message) 
    {
        const messageObj = body.message;
        await handleMessage(messageObj);
    }

    return;
}

module.exports = { handler };
