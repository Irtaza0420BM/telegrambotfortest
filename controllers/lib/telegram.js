const { axiosInstance } = require("./axios");

function sendMessage(messageObj, messageText, replyMarkup = null) {
    console.log("I am in sendMessage");
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
                console.log("Handling /start command");
                return sendMessage(messageObj, "Welcome! Click the button below to start:", {
                    inline_keyboard: [
                        [
                            {
                                text: "Open Web App",
                                web_app: {
                                    url: "https://t.me/irtazabot/webapp", // Replace with your Web App URL
                                },
                            },
                        ],
                    ],
                });
            default:
                return sendMessage(messageObj, "Sorry, I don't understand.");
        }
    } else {
        console.log("Handling regular message");
        return sendMessage(messageObj, messageText);
    }
}

module.exports = { handleMessage };
