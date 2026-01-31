import "dotenv/config";
import { Client, GatewayIntentBits } from 'discord.js';
import { commands } from "./commands";
const client = new Client({ 
    intents: [
      GatewayIntentBits.Guilds, 
      GatewayIntentBits.GuildMessages, 
      GatewayIntentBits.GuildMessageReactions, 
      GatewayIntentBits.MessageContent
    ] 
  });
const bot_Token:string = process.env.TOKEN??"";

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    for(const command of commands){
        if (typeof command == 'object' && 'data' in command && 'execute' in command) {
            if (interaction.commandName != command.data.name) {
                continue;
            }
            command.execute(interaction);
            break;
        } else {
            await interaction.reply({ content: 'Não encontrei o comando, utilize /help para saber a lista de comandos.', ephemeral: true });
            console.error('Erro ao ler comando: ', command);
        }
    }
  });

client.login(bot_Token);
console.log('Bot On!!!!!')