import { Markup } from "telegraf";
import { bot } from "../bot.js";
import { User } from "../../models/user.model.js";
import { regionKeyboard } from "../keyboards/userkeyboars.js";
import { checkSubscription } from "../subscription/subscription.js";
import { downloadAndSendVideo } from "../videoDownload.js";

const subKeyboard = Markup.inlineKeyboard([
  [Markup.button.url("Kanalga a'zo bo'lish ✅", "https://t.me/n26_bots")],
  [Markup.button.callback("Tekshirish 🔄️", "chesk_sub")],
]);

const regionButtons = Markup.inlineKeyboard([
  [Markup.button.callback("Sirdaryo", "sirdaryo")],
  [Markup.button.callback("Toshkent", "toshkent")],
]);

bot.start(async (ctx) => {
  const id = ctx.from.id;
  const sub = await checkSubscription(ctx, id);

  if (sub === "left") {
    return ctx.reply(
      "Botdan foydalanish uchun quyidagi kanallarga a'zo bo'ling:",
      subKeyboard
    );
  }

  let existUser = await User.findOne({ chat_id: id });
  console.log(existUser)
  if (!existUser) {
    await User.create({ chat_id: id, step: "name" });
    return ctx.reply("Assalomu aleykum! Ismingizni kiriting:");
  }

  switch (existUser.step) {
    case "name":
      ctx.reply("Ismingizni kiriting:");
      break;
    case "contact":
      ctx.reply(
        "Telefon raqamingizni ulashing:",
        Markup.keyboard([
          [Markup.button.contactRequest("Telefon raqamni ulashish!")],
        ])
          .resize()
          .oneTime()
      );
      break;
    case "region":
      ctx.reply("Viloyatingizni tanlang:", regionButtons);
      break;
    case "menu":
      ctx.reply(
        "Menyudan vazifani tanlang",
        Markup.keyboard([["Musiqa izlash 🎵", "Video izlash 🎥"]])
          .resize()
          .oneTime()
      );
      break;

    // case "menu":
    //   if (text === "Video izlash 🎥") {
    //     await User.findOneAndUpdate(
    //       { chat_id: id },
    //       { step: "wait_video_link" }
    //     );
    //     return ctx.reply(
    //       "Menga video havolasini (linkini) yuboring, men uni sizga yuklab beraman."
    //     );
    //   }
    //   break;


  }
});

bot.action("chesk_sub", async (ctx) => {
  const id = ctx.from.id;
  const sub = await checkSubscription(ctx, id);

  if (sub === "left") {
    await ctx.answerCbQuery("Siz hali a'zo emassiz!", { show_alert: true });
    return;
  }

  await ctx.answerCbQuery("Obuna tasdiqlandi!");
  await ctx.deleteMessage();

  let existUser = await User.findOne({ chat_id: id });
  if (!existUser) {
    await User.create({ chat_id: id, step: "name" });
  }
  ctx.reply("Xush kelibsiz! Ismingizni kiriting:");
});

bot.on("text", async (ctx) => {
  const id = ctx.from.id;
  const text = ctx.message.text;
  const user = await User.findOne({ chat_id: id });
  if (!user) return;
  if (user.step === "wait_video_link") {

    const urlRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|instagram\.com|tiktok\.com)\/.+$/;

    if (urlRegex.test(text)) {
      ctx.reply("Video tahlil qilinmoqda, iltimos kuting... ⏳");

      await User.findOneAndUpdate(
        { chat_id: id },
        { step: "wait_video" }
      );
      return await downloadAndSendVideo(ctx, text);
    } else {
      return ctx.reply("Iltimos, haqiqiy video havolasini yuboring!");
    }
  }


  if (user.step === "name") {
    await User.findOneAndUpdate(
      { chat_id: id },
      { name: text, step: "contact" }
    );
    return ctx.reply(
      `Raxmat ${text}! \nTelefon raqamingizni ulashing:`,
      Markup.keyboard([
        [Markup.button.contactRequest("Telefon raqamni ulashish!")],
      ])
        .resize()
        .oneTime()
    );
  }

  if (user.step === "menu" && text === "Musiqa izlash 🎵") {
    return ctx.reply("Qaysi musiqani izlaymiz?");
  }else if(user.step === "menu" && text === "Video izlash 🎥"){
    await User.findOneAndUpdate(
      { chat_id: id },
      { step: "wait_video_link" }
    );
    return ctx.reply("Video url ni kiriting!");
  }
});

bot.on("contact", async (ctx) => {
  const id = ctx.from.id;
  const phone = ctx.message.contact.phone_number;

  await User.findOneAndUpdate(
    { chat_id: id },
    { contact: phone, step: "region" }
  );
  ctx.reply("Viloyatingizni tanlang:", regionButtons);
});

bot.action(["sirdaryo", "toshkent"], async (ctx) => {
  const id = ctx.from.id;
  const region = ctx.match[0];

  await User.findOneAndUpdate(
    { chat_id: id },
    { region: region, step: "menu" }
  );
  await ctx.answerCbQuery(`${region} saqlandi!`);
  await ctx.editMessageText("Ro'yxatdan o'tish yakunlandi!");

  ctx.reply(
    "Menyudan vazifani tanlang",
    Markup.keyboard([["Musiqa izlash 🎵"], ["Video izlash 🎥"]]).resize()
  );
});

bot.launch();
