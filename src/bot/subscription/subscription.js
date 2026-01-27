export const checkSubscription=async (ctx,id) => {
    const url = "@n26_bots";
    return await ctx.telegram.getChatMember(url,id)
}