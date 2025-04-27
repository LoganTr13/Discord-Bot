import { SlashCommandBuilder } from "discord.js";

export default class Ping{
    public readonly data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Verifica a latência do Bot.");
    
    public readonly execute = async (interaction: any) => {
        await interaction.reply("🏓 Pong! Latência do Bot ( " + interaction.client.ws.ping + " ) ms")
    }
}