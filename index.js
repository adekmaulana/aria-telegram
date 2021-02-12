'use strict'

const { Telegraf } = require('telegraf')
const Aria2 = require('aria2')
const commands = require('./core/commands')
// Init aria2c daemon
require('./core/aria').init()

const bot = new Telegraf(process.env.BOT_TOKEN)
const aria2 = new Aria2()
const guid = []
const username = process.env.BOT_USERNAME


bot.context = {
  aria: aria2,
}
// Open Aria2 WebSocket
aria2
  .open()
  .then(() => console.log("Aria2: WebSocket open"))
  .catch(err => console.log("Aria2:", err));

// pattern is case sensitive including your bot username
const pattern = /^\/([a-zA-Z]+)(@.*bot)?(?: |$)(.*)/i
bot.hears(pattern, (ctx) => {
  if (ctx.match[2] !== username || !ctx.match[2]) {
    let command = ctx.match[1]
    if (command in commands) {
      commands[command].execute(ctx)
    }
  }
})

bot.launch()

aria2.on("onDownloadStart", ([guid]) => {
  console.log("aria2 onDownloadStart", guid);
});

// Enable graceful stop
process.once('SIGINT', () => {
  bot.stop('SIGINT')
})
process.once('SIGTERM', () => {
  bot.stop('SIGTERM')
})
