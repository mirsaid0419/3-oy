import ytdl from "@distube/ytdl-core";
import fs from "fs";
import path from "path";

async function downloadAndSendVideo(ctx, url) {
  // Videolar saqlanadigan papka manzili
  const dir = path.join(process.cwd(), "src", "uploads", "videos");
  const fileName = `${ctx.from.id}_${Date.now()}.mp4`; // Fayl nomi bir xil bo'lib qolmasligi uchun vaqt qo'shildi
  const filePath = path.join(dir, fileName);
  try {
      // 1. Papka mavjudligini tekshirish, yo'q bo'lsa yaratish
      if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        console.log(url)

    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title;

    const msg = await ctx.reply("Video yuklanmoqda... ⏳");

    // 2. Videoni ko'rsatilgan manzilga yuklash
    const videoStream = ytdl(url, {
      quality: "highestvideo",
      filter: "audioandvideo",
    });

    const fileWriter = fs.createWriteStream(filePath);
    videoStream.pipe(fileWriter);

    fileWriter.on("finish", async () => {
      try {
        // 3. Telegramga yuborish
        await ctx.replyWithVideo({ source: filePath }, { caption: title });

        // 4. "Yuklanmoqda" xabarini o'chirish
        await ctx.deleteMessage(msg.message_id).catch(() => {});
      } catch (sendError) {
        console.error("Yuborishda xato:", sendError);
        ctx.reply(
          "Videoni yuborishda xatolik (Hajmi 50MB dan katta bo'lishi mumkin)."
        );
      } finally {
        // 5. Har qanday holatda ham faylni serverdan o'chirish
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    });

    fileWriter.on("error", (err) => {
      console.error("Faylga yozishda xato:", err);
      ctx.reply("Fayl tizimida xatolik yuz berdi.");
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });
  } catch (error) {
    console.error("YTDL xatosi:", error);
    ctx.reply("Afsuski, videoni qayta ishlashda xatolik yuz berdi.");
  }
}

export { downloadAndSendVideo };
