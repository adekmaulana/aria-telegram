'use strict'

const { Telegraf } = require('telegraf')
const commands = require('./core/commands')
// Init aria2c daemon
require('./core/aria').init()

const bot = new Telegraf(process.env.BOT_TOKEN)


bot.hears(/^\/([a-zA-Z]+)/i, (ctx) => {
  let command = ctx.match[1]
  if (command in commands) {
    commands[command].execute(ctx, bot.telegram)
  }
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
