import "dotenv/config";
import { Client, GatewayIntentBits, SlashCommandBuilder} from 'discord.js';
import { commands } from "./commands";
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const bot_Token:string = process.env.TOKEN??"";

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    for(const command of commands){
        if (typeof command == 'object' && 'data' in command && 'execute' in command && interaction.commandName === command.data.name) {
            command.execute(interaction);
            break;
        } else {
            await interaction.reply({ content: 'Não encontrei o comando, utilize /help para saber a lista de comandos.', ephemeral: true });
            console.error('Error ao ler comando: ', command);
        }
    }
  });

client.login(bot_Token);