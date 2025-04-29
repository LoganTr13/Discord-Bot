import { EmbedBuilder } from "discord.js";
import Server from "./Server";

const emojiMinecraft = "<:Grass_Block:1366782251387584605>";

export default class Embeds {
  public renderServer(data: Server) {
    const infoServer = (data: Server) => {
      const textOnline = data.online ? "Online! 🟢" : "Offline 🔴";

      const info = [
        { name: "**Status: **", value: textOnline, inline: false },
        { name: "**Players Online: **", value: `${data.players.online}`, inline: true },
        { name: "**Max Players: **", value: `${data.players.max}`, inline: true },
        { name: "**Versão: **", value: data.version, inline: false },
      ];

      return info;
    };
    return new EmbedBuilder()
      .setTitle(`${emojiMinecraft} -  Host: ${data.host}`)
      .setDescription(`\n${data.motd}\n`)
      .setFields(infoServer(data));
  }
}
