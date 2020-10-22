const db = require("./db");
const { Telegraf } = require("telegraf");

const bot = new Telegraf("1304376568:AAGRm5vsC69_1ezvtqqbqxIxE4SsumQl548");

bot.on("message", async (ctx, next) => {
  const info = await ctx.tg.getUpdates();
  const userId = Number(info[0].message.text.split(" ")[1]);

  if (isNaN(userId)) {
    return ctx.reply(`failed!! Enter a valid number, UserId must be a number`);
  }

  const sql = `INSERT INTO user (userId) VALUES(${userId})`;
  const check = `select * from user where userId = ${userId}`;
  const param = [];
  db.get(check, param, (err, result) => {
    if (err) console.error(err);
    if (result) {
      ctx.reply(`${userId} is already in the database`);
      return;
    } else {
      db.all(sql, param, (err, result) => {
        if (err) console.log(err);
        ctx.reply(`${userId} added successfully`);
      });
    }
  });
});
bot.launch();
