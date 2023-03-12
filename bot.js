const TelegramBot = require('node-telegram-bot-api');
const OpenAI = require('openai-api');

// Replace with your own Telegram bot token
const token = '5867734178:AAESum2hdAQA9Z_a8yhBxIJK9fAOeKYdJoo';

// Replace with your own OpenAI API key
const apiKey = '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';

// Replace with the name of the free OpenAI GPT-3 engine
const engineName = 'text-davinci-003';

// Create a new Telegram bot object
const bot = new TelegramBot(token, { polling: true });

// Create a new OpenAI object with your API key
const openai = new OpenAI(apiKey);

// Define a handler function for when the bot receives a message
bot.on('message', async (msg) => {
  try {
    // Use the OpenAI API to generate a response to the message
    const response = await openai.complete({
      engine: engineName,
      prompt: msg.text,
      maxTokens: 100,
    });

    // Send the response back to the user
    bot.sendMessage(msg.chat.id, response.data.choices[0].text);
  } catch (error) {
    console.log(error);
    bot.sendMessage(msg.chat.id, 'Oops, something went wrong. Please try again later.');
  }
});

// Define a handler function for when the bot starts up
bot.on('polling_error', (error) => {
  console.log(error);
  bot.stopPolling();
  bot.startPolling();
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const message = `Hello, ${msg.from.first_name}! Welcome to my Telegram bot.`;
  bot.sendMessage(chatId, message);
});


console.log('Bot is running...');
