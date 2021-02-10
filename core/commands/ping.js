'use strict'

module.exports = {
    execute: (ctx, bot) => {
        const before = new Date().getTime()
        bot.sendMessage(ctx.chat.id, 'Calculating response time...').then((message) => {
            const after = new Date().getTime()
            const text = `Request response time: ${after - before} ms`
            bot.editMessageText(ctx.chat.id, message.message_id, '', text)
        })
    }
}
