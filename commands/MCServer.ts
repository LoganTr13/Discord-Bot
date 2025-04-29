import { SlashCommandBuilder } from "discord.js";
import { minecraftEdition } from "./class/mcserver/mcStatus.ts";
import MCStatus from "./class/mcserver/mcStatus.ts";
import Embeds from "./class/mcserver/entitys/Embeds.ts";

export default class MCServer {
  public readonly data = new SlashCommandBuilder()
    .setName("mcserver")
    .setDescription("Verifica o status de um servidor de minecraft.")
    .addStringOption((option) =>
      option
        .setName("ip")
        .setDescription("IP do servidor a ser verificado")
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName("bedrock")
        .setDescription("é Bedrock? (valor padrão: Java)")
        .setRequired(false)
    );

  public readonly execute = async (interaction: any) => {
    const api = new MCStatus();
    const IPServer:string = interaction.options.getString("ip");
    const isBedrock:boolean = interaction.options.getBoolean("bedrock");

    if(isBedrock){
        api.setEdition(minecraftEdition.Bedrock);
    }
    console.log('[QUERY] Buscando informações do ip ' + IPServer);
    const embedServer = new Embeds();
    const data = await api.getStatus(IPServer);
    return await interaction.channel.send({
      embeds:[embedServer.renderServer(data)]
    })
  };
}
