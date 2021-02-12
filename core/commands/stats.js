'use strict'


module.exports = {
  execute: (ctx) => {
    const downloads = []
    const param = ctx.match[3]
    ctx.reply('Processing...', { reply_to_message_id: ctx.message.message_id }
    ).then((message) => {
      if (param) {
        ctx.aria.call('tellStatus', param).then((status) => {
          ctx.reply(status)
        })
      } else {
        ctx.aria.call('tellActive').then((status) => {
          downloads.push(status)
        })
        ctx.aria.call('tellWaiting', 0, 1000).then((status) => {
          downloads.push(status)
        })
        ctx.aria.call('tellStopped', 0, 1000).then((status) => {
          downloads.push(status)
        })
        ctx.reply(downloads)
      }
    })
  }
}
