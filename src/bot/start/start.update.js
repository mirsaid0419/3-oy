import { Markup } from "telegraf";
import { bot } from "../bot.js";
import { User } from "../../models/user.model.js";
import { regionKeyboard } from "../keyboards/userkeyboars.js";
import { checkSubscription } from "../subscription/subscription.js";

bot.start(async (ctx) => {
  const id = ctx.from.id;
  const subscription = await checkSubscription(ctx, id);
  if (subscription) {
    ctx.reply(Markup.inlineKeyboard([[{}]]));
  }
  const existUser = await User.findOne({ chat_id: id });
  if (!existUser || existUser.step == "name") {
    await User.create({ chat_id: id });
  }
  switch (existUser.step) {
    case "name":
      await User.updateOne({ chat_id: existUser.chat_id }, { step: "contact" });
      ctx.reply(`assalomu aleykum \n\n Isminggizni kiriting: `);
      break;
    case "contact":
      await User.updateOne({ chat_id: existUser.chat_id }, { step: "region" });
      ctx.reply(
        `Viloyatinggizni tanlang: `,
        Markup.keyboard([
          [
            { text: "Telefon raqamni ulashish!", request_contact: true },
            { text: "Joylashuvni ulashish!", request_location: true },
          ],
        ])
      );
    case "region":

      await User.updateOne({ chat_id: existUser.chat_id }, { step: "menu" });
      ctx.reply(`Menyudan vazivalarni tanlang`,

      )

      break;
    default:
      break;
  }
  // console.log(id)
  const exist_step = await User.findOne({});
});
bot.on("text", (ctx) => {
  
  const name = ctx.message.text;
  if (name) {
    ctx.reply(
      `Raxmat ${name}!\n\nTelefon raqaminggizni kiriting`,
      Markup.keyboard([
        [
          { text: "Telefon raqamni ulashish!", request_contact: true },
          { text: "Joylashuvni ulashish!", request_location: true },
        ],
      ])
        .resize()
        .oneTime()
    );
  }
});

bot.on("contact", (ctx) => {
  const phone = ctx.message.contact.phone_number;
  ctx.reply(`Viloyatinggizni tanlang: `, Markup.inlineKeyboard(regionKeyboard));
});

bot.action("sirdaryo", (ctx) => {
  const viloyat = ctx.update.callback_query.data;
  // ctx.reply("Joylashu")
  ctx.answerCbQuery("Viloyatinggiz muvofaqiyatli saqlandi!");
});
bot.on("location", (ctx) => {
  // Markup.button.locationRequest()
  const { latitude, longitude } = ctx.message.location;
  ctx.reply(
    `Rahmat! Sizning koordinatalaringiz: \nKenglik: ${latitude}\nUzunlik: ${longitude}`
  );
});

bot.launch();
