import sendEmbed from "../helpers/sendEmbed.js";

export default function helpEmbed(message, args, bot) {
  //If 1 argument, display help for that command
  if (args.length == 1) {
    //Add help for single command
    return;
  }

  //If invalid Artguments
  if (args.length !== 0) {
    sendEmbed(message, "Invalid Arguments", "Use `!help` or `!help <command>`");
    return;
  }

  //Assume just !help or !commands was used
  if (bot.commands.length == 0) {
    sendEmbed(message, "I Have No Commands Currently");
    return;
  }

  let helpFields = [];

  bot.commands.forEach((cmd) => {
    helpFields.push({
      name: `${bot.config.prefix}${cmd.name}`,
      value: `${cmd.description ? `${cmd.description}` : "No description"}`,
    });
  });

  sendEmbed(message, "Available Commands", "", helpFields);
}
