import "dotenv/config";
import { REST, RESTPostAPIChatInputApplicationCommandsJSONBody, Routes, SlashCommandBuilder } from 'discord.js';
import { readdirSync } from 'fs';
type Command = {
    data: SlashCommandBuilder,
    execute: (interaction: any) => Promise<void>
}
const bot_Token:string = process.env.TOKEN??"";
const client_id:string = process.env.CLIENT_ID??"";
const rest = new REST().setToken(bot_Token);
const commands:RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
const files = readdirSync('./commands');

for(const file of files){
    const command:Command = (await import('./commands/' + file)).default
    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
    } else {
        console.log(`[WARNING] The command at ${file} is missing a required "data" or "execute" property.`);
    }
}
try {
  console.log(`Started refreshing ${commands.length} application (/) commands.`);

  // inclui todos os comandos para a lsita de slash commands
  const data:any = await rest.put(
    Routes.applicationCommands(client_id),
    { body: commands },
  );

  // Para deletar comandos teste

  // const command_id:string = '1246833263922643046';
  // const data:any = await rest.delete(
  //     Routes.applicationCommand(client_id, command_id),
  //     { body: commands },
  //   );

  console.log(`Successfully reloaded ${data.length} application (/) commands.`);
} catch (error) {
  // And of course, make sure you catch and log any errors!
  console.error(error);
}