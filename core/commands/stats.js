'use strict'


module.exports = {
  execute: (ctx) => {
    ctx.reply('Processing...', { reply_to_message_id: ctx.message.message_id }
    ).then((message) => {
      if (ctx.guid.length === 0) {
        ctx.telegram.editMessageText(ctx.chat.id, message.message_id, null, 'Empty download')
      } else {
        ctx.aria.call("tellStatus", ctx.guid[0]).then((status) => {
            console.log(status)
        })
      }
    })
  }
}
