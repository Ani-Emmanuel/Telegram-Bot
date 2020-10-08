const express = require("express");
const db = require("./db");
const { Telegraf } = require("telegraf");

const bot = new Telegraf("add your bot ref id");

bot.on("message", async (ctx, next) => {
  const info = await ctx.tg.getUpdates();
  const userId = Number(info[0].message.text.split(" ")[1]);
  console.log(typeof userId);
    const sql = `INSERT INTO user (userId) VALUES(${userId})`;
      const check = `select * from user where userId = ${userId}`;
      const param = [];
      db.get(check, param, (err, result) => {
        if (err) console.error(err);
        console.log(result);
        if (result) {
          ctx.reply("You cannot perform this action");
          return;
        } else {
          db.all(sql, param, (err, result) => {
            if (err) console.log(err);
            console.log(`User added successfully`);
          });
        }
      });
});
bot.launch();
