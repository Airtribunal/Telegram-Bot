// Import
const TelegramApi = require("node-telegram-bot-api")

// Token
const token = "5564677142:AAF4fhx-wW2r-LvO3FPM3KVkbjXqjT8DuHE"

// Creating The Bot
const bot = new TelegramApi(token, {
    polling: true
})

// Start
function start() {
    bot.setMyCommands([
        {command: "/start", description:"Bot's geetings"},
        {command: "/info", description: "Get information about the user"}
    ])

    // Message Part
    bot.on("message", async msg => {
        const text = msg.text;
        const chatId = msg.from.id
        const firstName = msg.from.first_name
        if (text === "/start") {
            await bot.sendMessage(chatId, `Hello ${firstName}! You've just started using the bot. Please, check other bot commands`)
            // Send Sticker
            // await bot.sendSticker(chatId, "https://github.com/TelegramBots/book/raw/master/src/docs/sticker-fred.webp")
        }
        if (text === "/info") {
            await bot.sendMessage(chatId, `Your name is ${firstName}` )
        }
    })
}

start()