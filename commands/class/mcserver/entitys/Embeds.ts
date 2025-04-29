import { EmbedBuilder } from "discord.js";
import Server from "./Server";

export default class Embeds {
  public renderServer(data: Server) {
    const infoServer = (data: Server) => {
      const textOnline = data.online ? "Online! 🟢" : "Offline 🔴";

      const info = [
        { name: "**Status: **", value: textOnline, inline: true },
        { name: "\u200B", value: "\u200B", inline: true },
        { name: "**Versão: **", value: data.version, inline: true },
        { name: "**Players Online: **", value: `${data.players.online}`, inline: true },
        { name: "**Max Players: **", value: `${data.players.max}`, inline: true },
      ];

      return info;
    };
    return new EmbedBuilder()
      .setTitle(`Host: ${data.host}`)
      .setThumbnail(
        "https://raw.githubusercontent.com/LoganTr13/Discord-Bot/main/Assets/images/GrassBlockMinecraft.png"
      )
      .setDescription(`\n${data.motd}\n`)
      .setFields(infoServer(data));
  }
}
