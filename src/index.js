export * from "discord.js";
import { Client } from "discord.js";
import initializeDefaults from "./util/initializeDefaults";
import commandHandler from "./commandHandler";
import loadCommands from "./loadCommands";
import loadEvents from "./loadEvents";

const defaultConfig = {
  //token: "token here"
  prefix: "!",
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"],
  embedColor: 0x379c6f,
  helpCommand: true,
  debugMessages: true,
  noCommandMessage: true,
};

export default async function createBot(config) {
  let bot = {};
  config = initializeDefaults(defaultConfig, config);
  const commands = await loadCommands("directory-here");

  bot.client = new Client({
    intents: config.intents,
  });

  bot.client.on("ready", () => {
    console.log(`Logged in as ${bot.client.user.tag}`);
  });

  bot.client.on("message", async (message) => {
    if (!message.content.trim().startsWith(config.prefix)) return;
    commandHandler(
      message,
      config.prefix,
      commands,
      config.debugMessages,
      config.noCommandMessage,
      config.helpCommand,
      bot
    );
  });

  loadEvents();

  bot.client.login(config.token.toString().trim());
  return bot;
}
