import advancedStringSplit from "./advancedStringSplit.js";

export default function commandHandler() {
  const argsString = message.content.slice(bot.config.prefix.length).trim();
  const args = advancedSplitString(argsString);
  const command = args.shift().toLowerCase();
}
