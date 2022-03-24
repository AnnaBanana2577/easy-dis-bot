export default function helpEmbed(message, command, args, prefix) {
  if (args.length == 1) {
  }

  if (args.length !== 0) {
    return {
      title: `Invalid arguments`,
      description: "Use `!help` or `!help <command>`",
      color: 0xff0000,
      footer: {
        text: message.guild.name,
        icon_url: message.guid.icon_url,
      },
    };
  }

  let helpFields = [];

  commands.forEach((cmd) => {
    helpFields.push({
      name: `${prefix}${cmd.name}`,
      value: `${cmd.description ? `${cmd.description}` : "No description"}`,
    });
  });

  const helpMessage = {
    title: "Available Commands",
    fields: helpFields,
    footer: {
      text: message.guid.name,
      icon_url: message.guild.icon_url,
    },
  };
}
