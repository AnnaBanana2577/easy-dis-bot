export default function sendEmbed(ctx, title, description, fields) {
  const embed = {};
  if (title) embed.title = title;
  if (description) embed.description = description;
  if (fields) embed.fields = fields;
  embed.color = ctx.bot.config.embedColor;
  embed.footer = {
    text: ctx.guild.name,
    icon_url: ctx.guild.iconURL(),
  };
  ctx.channel.send({ embeds: [embed] });
}
