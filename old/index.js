export * from "discord.js";
import { Client } from "discord.js";

import initializeDefaults from "./util/initializeDefaults.js";
import commandHandler from "./commandHandler.js";
import autoLoader from "./autoLoader.js";

const defaultConfig = {
  //token: "token here"
  prefix: "!",
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"],
  embedColor: 0x379c6f,
  helpCommand: true,
  pingCommand: true,
  debugMessages: true,
  noCommandMessage: true,
  commandsDir: "commands",
  eventsDir: "events",
};

export default async function createBot(config) {
  let bot = {};
  bot.config = initializeDefaults(defaultConfig, config);
  [bot.commands, bot.events] = await autoLoader(
    bot.config.commandsDir,
    bot.config.eventsDir
  );

  bot.client = new Client({
    intents: bot.config.intents,
  });

  bot.client.on("ready", () => {
    console.log(`Logged in as ${bot.client.user.tag}`);
  });

  bot.client.on("messageCreate", async (message) => {
    if (!message.content.trim().startsWith(bot.config.prefix)) return;
    commandHandler(message, bot);
  });

  bot.client.login(bot.config.token.toString().trim());
  return bot;
}
