"use strict";
/* eslint-disable camelcase */


module.exports = {
  execute(ctx) {
    const param = ctx.match[3];
    const replyTo = { reply_to_message_id: ctx.message.message_id };
    ctx.reply("Processing...", replyTo).then((message) => {
      if (param) {
        const data = ctx.aria.get_download(param);
        data.then((status) => {
          let text;
          if (status === null) {
            text = "status: GID not found";
          } else {
            text = JSON.stringify(status);
          }
          return ctx.telegram.editMessageText(
            ctx.chat.id,
            message.message_id,
            null,
            text
          );
        });
      } else {
        const downloads = ctx.aria.get_downloads();
        return ctx.telegram.editMessageText(
          ctx.chat.id,
          message.message_id,
          null,
          downloads
        );
      }
    });
  }
};
