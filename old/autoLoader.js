export default async function autoLoader(commandsDir, eventsDir) {
  let commands = [
    {
      name: "test",
      aliases: ["t", "debug"],
      description: "This command is for testing purposes",
      arguments: ["arg1", "arg2", "arg3"],
      execute: async (ctx, args) => {},
    },
  ];
  let events = [];
  return [commands, events];
}
