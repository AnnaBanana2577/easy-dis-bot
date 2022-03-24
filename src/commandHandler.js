import advancedSplitString from "./util/advancedSplitString";
import helpEmbed from "./util/helpEmbed";

export default function commandHandler(
  message,
  prefix,
  commands,
  debugMessages,
  noCommandMessage,
  helpCommand,
  bot
) {
  //Extract command and arguments from message
  const argsString = message.content.slice(prefix.length).trim();
  const args = advancedSplitString(argsString);
  const command = args.shift().toLowerCase();

  if (command == ("help" || "commands") && helpCommand) {
    const helpMessage = helpEmbed(message, command, args, prefix);
    message.channel.send({ embeds: [helpMessage] });
    return;
  }

  let isCommandFound = false;
  commands.forEach((cmd) => {
    if (cmd.name == command || cmd.aliases.includes(command)) {
      isCommandFound = true;

      //Add check if arguments work

      try {
        cmd.execute(channel);
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

        if (debugMessages) message.channel.send({ embeds: [errorMessage] });
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
