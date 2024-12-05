const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/telegramBot')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const userSchema = new mongoose.Schema({
  userId: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  dateRegistered: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());

const botToken = '7526568676:AAE3G8diktV-5em87glXdXUUJDLa_SIOPZY';
const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

app.post('*', async (req, res) => {
  console.log(req.body)
    const update = req.body;

    if (update.message && update.message.text) {
        const userId = update.message.from.id;
        const userName = update.message.from.first_name;
        const chatId = update.message.chat.id;

        if (update.message.text === '/start') {
            // Check if the user already exists in the database
            let user = await User.findOne({ userId });

            if (user) {
                // If the user exists, send a welcome back message
                return sendTelegramMessage(chatId, `Welcome back, ${user.name}!`);
            } else {
                // If the user doesn't exist, register the user
                const newUser = new User({
                    userId: userId,
                    name: userName,
                    dateRegistered: new Date().toISOString(),
                });

                // Save the new user to the database
                await newUser.save();

                // Send registration confirmation
                return sendTelegramMessage(chatId, `Hello, ${userName}! You have been successfully registered.`);
            }
        }
    }

    res.send('OK');
});

// Helper function to send a message to Telegram
async function sendTelegramMessage(chatId, text) {
  try{
    const response = await fetch(telegramApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: text,
        }),
    });

    const data = await response.json();
    if (!data.ok) {
        console.error('Error sending message to Telegram:', data);
    }
  }
  catch(error)
  {
    console.log("Unable to do anything Need VPN")
  }
}

// Start the Express server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
