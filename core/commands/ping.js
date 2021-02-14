'use strict'

module.exports = {
  execute: function(ctx) {
    const before = new Date().getTime()
    ctx.reply('Calculating response time...',
      { reply_to_message_id: ctx.message.message_id }
    ).then((message) => {
      const after = new Date().getTime()
      const text = `Request response time: ${after - before} ms`
      ctx.telegram.editMessageText(ctx.chat.id, message.message_id, null, text)
    })
  }
}
