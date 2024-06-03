import "dotenv/config";
import { Client, GatewayIntentBits, SlashCommandBuilder} from 'discord.js';
import { readdirSync } from 'fs';
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const bot_Token:string = process.env.TOKEN??"";
const files = readdirSync('./commands');
type Command = {
    data: SlashCommandBuilder,
    execute: (interaction: any) => Promise<void>
}
//Interpretador de comandos.
//Procura o comando na pasta de comandos e se existe executa o codigo definido dentro

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    for(const file of files){
        const command:Command = (await import('./commands/' + file)).default
        if ('data' in command && 'execute' in command && interaction.commandName === command.data.name) {
            command.execute(interaction);
        } else {
            await interaction.reply({ content: 'Não encontrei o comando, utilize /help para saber a lista de comandos.', ephemeral: true });
        }
    }
  });

client.login(bot_Token);