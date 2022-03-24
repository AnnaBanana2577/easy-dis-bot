# Easy Discord Bot

A simple and easy to use package to rapidly create single-server Discord bots.
This package was developed for internal use, but can be used by anyone.

**Please note: this package is in early development. Release version 1.0.0 will be published to npm**

## Features

- Autoload commands and events from directory/folder
- Configurable command handler with helpful features
- Convenient helper functions to make writing commands simpler

All of that with a **dead simple** API.

## Usage

```
import createBot from "easy-dis-bot";

const bot = createBot({
    token: "token here",
    prefix: "!",
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"],
    commandsDir: "commands",
    eventsDir: "events"
});
```

That's it. All files in the commands folder and events in the events folder will be automatically loaded.

## Commands

To create a command, simply create a js/ts file.

Example:

```
{
    name: "hello",
    aliases: ["hi", "hey"],
    requiredArgs: 0.
    description: ""
}

```

## Examples

## Todo

- Finish command handler
- Create auto loader for commands & events
- Add more helper functions
