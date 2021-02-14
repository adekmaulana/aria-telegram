"use strict";
/* eslint-disable camelcase */


module.exports = {
  execute(ctx) {
    const magnet = ctx.match[3];
    const replyTo = { reply_to_message_id: ctx.message.message_id };
    ctx.reply("Processing...", replyTo).then((message) => {
      if (!magnet) {
         return ctx.telegram.editMessageText(
           ctx.chat.id,
           message.message_id,
           null,
          "Provide me a magnet link"
         );
      }
      ctx.aria.rawMethod.call("addUri", [magnet]).then((gid) => {
         return ctx.telegram.editMessageText(
           ctx.chat.id,
           message.message_id,
           null,
           `GID: ${gid}`
         );
      });
    });
  }
};
