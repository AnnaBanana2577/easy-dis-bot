import advancedSplitString from "./util/advancedSplitString";
import getEmbedFooter from "./util/getEmbedFooter";

export default function commandHandler(
  message,
  prefix,
  commands,
  debug,
  noCommandMessage,
  helpCommand,
  bot
) {
  //Extract command and arguments from message
  const argsString = message.content.slice(prefix.length).trim();
  const args = advancedSplitString(argsString);
  const command = args.shift().toLowerCase();

  let isCommandFound = false;

  commands.forEach((cmd) => {
    if (cmd.name == command || cmd.aliases.includes(command)) {
      isCommandFound = true;
      try {
        cmd.execute(channel);
      } catch (err) {
        const errorMessage = {
          title: `Error executing ${cmd.name}`,
          description: `${err}`,
          color: 0xff0000,
          footer: getEmbedFooter(),
        };
        message.channel.send({ embeds: [] });
      }
    }
  });

  if (!isCommandFound && noCommandMessage)
    message.channel.send(
      `That is a command I do not support. ${
        helpCommand ? "Use `!help` for a list of available commands." : ""
      }`
    );
}
