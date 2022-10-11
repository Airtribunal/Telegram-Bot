// Imports
const TelegramApi = require("node-telegram-bot-api")
const {gameOptions, againOptions} = require("./options.js")

// Token
const token = "5661408245:AAEjrdzjmmoC0x41rFoWEBFFCI7EUs8LhgA"

// Creating The Bot
const bot = new TelegramApi(token, {
    polling: true
})

const chats = {}

// Start the game 
const startGame = async (chatId) => {
    await bot.sendMessage(chatId, "Try to guess what number from 0 to 9 I've chosen!", gameOptions);
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    console.log(chats[chatId]);
    await bot.sendMessage(chatId, "Waiting for your guess")
}

// Start
function start() {
    bot.setMyCommands([{
            command: "/start",
            description: "Bot's geetings"
        },
        {
            command: "/info",
            description: "Get information about the user"
        },
        {
            command: "/game",
            description: "Play with the bot"
        }
    ])

    // Message Part
    bot.on("message", async msg => {
        const text = msg.text;
        const chatId = msg.from.id
        const firstName = msg.from.first_name

        if (text === "/start") {
            await bot.sendMessage(chatId, `Hello ${firstName}! You've just started using the bot. Please, check other bot commands`)
            return bot.sendSticker(chatId, "https://tlgrm.eu/_/stickers/f7e/fba/f7efbacf-9817-4b7e-8e07-dac0cf0430d1/192/5.webp")
        }

        if (text === "/info") {
            return bot.sendMessage(chatId, `Your name is ${firstName}`)
        }

        if (text === "/game") {
            return startGame(chatId)
        }

        return bot.sendMessage(chatId, `I don't get it. Probably, It's not the command`)

    })

    bot.on("callback_query", msg => {
        const data = msg.data
        const chatId = msg.message.chat.id
        if (data === "/again") {
            return startGame(chatId)
        }

        if (data == chats[chatId]) {
            bot.sendMessage(chatId, "Congratulations, you won the game!", againOptions)
        } else {
            bot.sendMessage(chatId, `Unfortunately, You haven't won. The bot has guessed number ${chats[chatId]}`, againOptions)
        }
    })
}

start()