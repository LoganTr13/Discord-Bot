import "dotenv/config";
import { REST, RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from 'discord.js';
import { commands } from "./commands";

const discordCommand:RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
const bot_Token:string = process.env.TOKEN??"";
const client_id:string = process.env.CLIENT_ID??"";
const rest = new REST().setToken(bot_Token);

for(const command of commands){
    if (typeof command == 'object' && 'data' in command && 'execute' in command) {
        discordCommand.push(command.data.toJSON());
    } else {
        console.log(`[WARNING] The command at ${command["constructor"]["name"]} is missing a required "data" or "execute" property.`);
    }
}
try {
  console.log(`Started refreshing ${commands.length} application (/) commands.`);

  // inclui todos os comandos para a lsita de slash commands
  const data:any = await rest.put(
    Routes.applicationCommands(client_id),
    { body: discordCommand },
  );

  // Para deletar comandos teste

  // const command_id:string = '69854758475978534896';
  // const data:any = await rest.delete(
  //     Routes.applicationCommand(client_id, command_id),
  //     { body: discordCommand },
  //   );

  console.log(`Successfully reloaded ${data.length} application (/) commands.`);
} catch (error) {
  // And of course, make sure you catch and log any errors!
  console.error(error);
}