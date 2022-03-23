import { Client } from "discord.js";
export * from "discord.js";

export class Bot {
  constructor(token, prefix, help = true, debug = true) {
    this.token = token;
    this.prefix = prefix;
    this.help = help;

    this.commands = [];

    this.client = new Client({
      intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"],
    });

    this.client.on("ready", () => {
      console.log(`Logged in as ${this.client.user.tag}`);
    });

    this.client.on("message", async (message) => {
      const args = message.content
        .slice(this.prefix.length)
        .trim()
        .split(/ +/g);
      const command = args.shift().toLowerCase();

      if (!message.content.startsWith(this.prefix)) return;

      if (help && (command == "help" || "commands" || "cmds")) {
        let helpFields = [];
        this.commands.forEach((cmd) =>
          helpFields.push({
            name: cmd.name,
            value: cmd.description,
          })
        );

        console.log(helpFields);

        let helpEmbed = {
          color: 0x379c6f,
          title: "Available Commands",
          fields: helpFields,
          footer: {
            text: message.guild.name,
            icon_url: message.guild.iconURL(),
          },
        };

        message.channel.send({ embeds: [helpEmbed] });
      }

      //Add command checker and executer here
    });

    //Add event handler here too
  }

  addCommand(name, aliases, handler, description = "") {
    this.commands.push({
      name: name,
      aliases: aliases,
      handler: handler,
      description: description,
    });
  }

  start() {
    this.client.login(this.token.toString().trim());
  }
}
