const { axiosInstance } = require("./axios");

function sendMessage(messageObj, messageText) {
    console.log("I am in sendMessage");
    return axiosInstance.get("sendMessage", {
        chat_id: messageObj.chat.id,
        text: messageText,
    });
}

function handleMessage(messageObj) {
    const messageText = messageObj.text || "";

    if (messageText.charAt(0) === "/") {
        const command = messageText.substr(1);
    
        switch (command) {
            case "start":
                console.log("Handling /start command");
                return sendMessage(messageObj, "Hi! I'm a bot!");
            default:
                return sendMessage(messageObj, "Sorry, I don't understand.");
        }
    } else {
        console.log("Handling regular message");
        return sendMessage(messageObj, messageText);
    }
}

module.exports = { handleMessage };
