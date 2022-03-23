import advancedSplitString from "./util/advancedSplitString";

export default function commandHandler(message, prefix, commands, bot) {
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
      } catch {}
    }
  });

  if (!isCommandFound)
    message.channel.send(
      "That is a command I do not support. Use `!help` for a list of available commands."
    );
}
