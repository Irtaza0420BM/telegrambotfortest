const { axiosInstance } = require("./axios");

function sendMessage(messageObj, messageText, replyMarkup = null) {
    const payload = {
        chat_id: messageObj.chat.id,
        text: messageText,
    };

    if (replyMarkup) {
        payload.reply_markup = replyMarkup;
    }

    return axiosInstance.post("sendMessage", payload);
}

function handleMessage(messageObj) {
    const messageText = messageObj.text || "";

    if (messageText.charAt(0) === "/") {
        const command = messageText.substr(1);
    
        switch (command) {
            case "start":
                return sendMessage(messageObj, "Welcome! Click the button below to start:", {
                    inline_keyboard: [
                        [
                            {
                                text: "Open Web App",
                                web_app: {
                                    url: "https://telgame.netlify.app/", // Replace with your Web App URL
                                },
                            },
                        ],
                    ],
                });
            default:
                return sendMessage(messageObj, "Sorry, I don't understand.");
        }
    } else {
        return sendMessage(messageObj, messageText);
    }
}

module.exports = { handleMessage };
