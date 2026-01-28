export const checkSubscription = async (ctx, id) => {
  try {
    const channelId = "@n26_bots";
    const member = await ctx.telegram.getChatMember(channelId, id);

    const allowed = ["member", "administrator", "creator"];
    if (allowed.includes(member.status)) {
      return "member";
    }

    return "left";
  } catch (error) {
    console.error("Obunani tekshirishda xatolik:", error);
    return "left";
  }
};
