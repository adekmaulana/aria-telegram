"use strict";
/* eslint-disable camelcase */


module.exports = {
  execute(ctx) {
    const before = new Date().getTime();
    const replyTo = { reply_to_message_id: ctx.message.message_id };
    ctx.reply("Calculating response time...", replyTo).then((message) => {
      const after = new Date().getTime();
      const text = `Request response time: ${after - before} ms`;
      return ctx.telegram.editMessageText(
        ctx.chat.id,
        message.message_id,
        null,
        text
      );
    });
  }
};
