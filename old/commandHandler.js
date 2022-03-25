import advancedSplitString from "./util/advancedSplitString.js";
import helpEmbed from "./util/helpEmbed.js";
import sendEmbed from "./helpers/sendEmbed.js";

export default function commandHandler(message, bot) {
  //Extract command and arguments from message
  const argsString = message.content.slice(bot.config.prefix.length).trim();
  const args = advancedSplitString(argsString);
  const command = args.shift().toLowerCase();

  //Set message helpers
  message.bot = bot;
  message.sendEmbed = sendEmbed;

  //Check if command is ping
  if (command == "ping" && bot.config.pingCommand) {
    message.channel.send(
      `🏓Latency is ${
        Date.now() - message.createdTimestamp
      }ms. API Latency is ${Math.round(bot.client.ws.ping)}ms`
    );
    return;
  }

  //Check if command was help or commands
  if ((command == "help" || command == "commands") && bot.config.helpCommand) {
    helpEmbed(message, command, args, bot);
    return;
  }

  //Loop through commands and check if there's a match
  let isCommandFound = false;
  bot.commands.forEach((cmd) => {
    if (cmd.name.toLowerCase() == command || cmd.aliases.includes(command)) {
      isCommandFound = true;

      if (args.length !== cmd.arguments.length) {
        let cmdArgs = [];
        cmd.arguments.forEach((cmdArg) => {
          cmdArgs.push(`<${cmdArg}>`);
        });
        const argumentList = cmdArgs.join(" ");

        message.channel.send(
          `Invalid Arguments. Use \`${bot.config.prefix}${cmd.name} ${argumentList}\``
        );
      }

      try {
        cmd.execute(message, bot);
      } catch (err) {
        const errorMessage = {
          title: `Error executing ${cmd.name}`,
          description: `${err}`,
          color: 0xff0000,
          footer: {
            text: message.guid.name,
            icon_url: message.guid.icon_url,
          },
        };

        if (bot.config.debugMessages) {
          message.channel.send({ embeds: [errorMessage] });
          console.log(err);
        }
      }
    }
  });

  //Error message if no command found
  if (!isCommandFound && bot.config.noCommandMessage)
    message.channel.send(
      `That is a command I do not support. ${
        bot.config.helpCommand
          ? "Use `!help` for a list of available commands."
          : ""
      }`
    );
}
