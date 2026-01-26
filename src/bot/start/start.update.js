import { Markup } from "telegraf";
import { bot } from "../bot.js";

bot.start((ctx) => {
  const name = ctx.from.first_name;
  ctx.reply(`assalomu aleykum ${name} aka\n\n Isminggizni kiriting: `);
});
bot.on("text", (ctx) => {
  const name = ctx.message.text;
  if (name) {
    ctx.reply(
      `Raxmat ${name}!\n\nTelefon raqaminggizni kiriting`,
      Markup.keyboard([
        [{ text: "Telefon raqamni ulashish!", request_contact: true }],
      ]).resize().oneTime()
    );
  }
});

bot.on("contact",ctx=>{
  console.log(ctx.message.contact.phone_number)
})

bot.launch();
