"use strict";

const mirror = require("./commands/mirror");
const ping = require("./commands/ping");
const stats = require("./commands/stats");

module.exports = {
  mirror,
  ping,
  stats
};
