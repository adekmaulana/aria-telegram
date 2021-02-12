'use strict'


module.exports = {
  execute: (ctx) => {
    const magnet = ctx.match[3]
    ctx.reply('Processing...', { reply_to_message_id: ctx.message.message_id }
    ).then((message) => {
      if (!magnet) {
        ctx.telegram.editMessageText(ctx.chat.id, message.message_id, null, 'Provide me a magnet link')
      }
      ctx.aria.call("addUri", [magnet]).then((gid) => {
        ctx.guid.push(gid)
      })
    })
  }
}
