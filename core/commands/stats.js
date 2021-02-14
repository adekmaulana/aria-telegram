'use strict'


module.exports = {
  execute: function(ctx) {
    const param = ctx.match[3]
    ctx.reply('Processing...', { reply_to_message_id: ctx.message.message_id }
    ).then((message) => {
      if (param) {
        const data = ctx.aria.get_download(param)
        data.then((status) => ctx.reply(`status: ${JSON.stringify(status)}`))
      } else {
        const downloads = ctx.aria.get_downloads()
        ctx.reply(downloads)
      }
    })
  }
}
