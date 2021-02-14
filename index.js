'use strict'

const { Telegraf } = require('telegraf')

const aria = require('./core/aria')
const commands = require('./core/commands')
const username = process.env.BOT_USERNAME

// Initialize bot
const bot = new Telegraf(process.env.BOT_TOKEN)

// Extend context with aria
bot.context = {
  aria: aria
}

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

// Enable graceful stop
process.once('SIGINT', () => {
  bot.stop('SIGINT')
})
process.once('SIGTERM', () => {
  bot.stop('SIGTERM')
})
