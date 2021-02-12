'use strict'


async function download(aria, url) {
  const [guid] = await aria.call("addUri", url)
  return [guid]
}

module.exports = {
  execute: (ctx) => {
    let param = ctx.match[3]
    ctx.reply('Processing...', { reply_to_message_id: ctx.message.message_id }
    ).then((message) => {
      if (!param) {
        ctx.telegram.editMessageText(ctx.chat.id, message.message_id, null, 'Provide me a magnet link')
      }
      const result = download(ctx.aria, [param]).then((guid) => {
        console.log(guid)
      })
    })
  }
}
