export * from "discord.js";
import { Client } from "discord.js";

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

export default function createBot(config) {
  let bot = {};
  //---------------------------------------------------------------
  //Initialize Defaults
  for (const [key, value] of Object.entries(defaultConfig)) {
    if (!config.hasOwnProperty(key)) config[key] = value;
  }
  bot.config = config;

  //Load commands & events

  //Load database

  //Connect bot to command handler and login
  bot.client = new Client({
    intents: bot.config.intents,
  });
  bot.client.on("ready", () => {
    console.log(`Logged in as ${bot.client.user.tag}`);
  });
  bot.client.on("messageCreate", async (message) => {
    if (!message.content.trim().startsWith(bot.config.prefix)) return;
    //commandHandler(message, bot);
  });
  bot.client.login(bot.config.token.toString().trim());
  //-----------------------------------------------------------------
  return bot;
}
