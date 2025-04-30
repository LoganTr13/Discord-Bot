import { ChatInputCommandInteraction, SlashCommandBooleanOption, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import { minecraftEdition } from "./class/mcserver/mcStatus.ts";
import MCStatus from "./class/mcserver/mcStatus.ts";
import Embeds from "./class/mcserver/entitys/Embeds.ts";
export default class MCServer {
  public readonly data = new SlashCommandBuilder()
    .setName("mcserver")
    .setDescription("Verifica o status de um servidor de minecraft.")
    .addStringOption((option: SlashCommandStringOption) =>
      option
        .setName("ip")
        .setDescription("IP do servidor a ser verificado")
        .setRequired(true)
    )
    .addBooleanOption((option: SlashCommandBooleanOption) =>
      option
        .setName("bedrock")
        .setDescription("é Bedrock? (valor padrão: Java)")
        .setRequired(false)
    );

  public readonly execute = async (interaction: any) => {
    const api = new MCStatus();
    const IPServer:string = interaction.options.getString("ip",true);
    const isBedrock:boolean|null = interaction.options.getBoolean("bedrock");

    if(isBedrock){
        api.setEdition(minecraftEdition.Bedrock);
    }
    console.log('[QUERY] Buscando informações do ip ' + IPServer);
    const embedServer = new Embeds();
    const data = await api.getStatus(IPServer);
    if (!data) {
      return interaction.reply('IP Informado está incorreto!')
    }
    return await interaction.channel.send({
      embeds:[embedServer.renderServer(data)]
    })
  };
}
