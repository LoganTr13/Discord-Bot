import { SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import Pokemons from "./class/pokemon/pokemons";
import Embeds from "./class/pokemon/entitys/Embeds";

export default class Pokedex {
  public readonly data = new SlashCommandBuilder()
    .setName("pokedex")
    .setDescription("Consulta infomações dos pokemons.")
    .addStringOption((option: SlashCommandStringOption) =>
      option
        .setName("pokemon")
        .setDescription("Pesquisa um pokemon")
        .setRequired(false)
    );

  public readonly execute = async (interaction: any) => {
    let query = interaction.options.getString("pokemon");
    const pokedex = new Pokemons();
    const embedSend = new Embeds();

    if (query) {
      const response = await pokedex.getPokemon(query.toLowerCase());

      if (!response) {
        interaction.reply("Pokemon não encontrado!");
        return;
      }
      await interaction.reply("Pokemon Localizado!");
      return await interaction.channel.send({
        embeds: [await embedSend.renderPokemon(response)],
      });
    }

    const limit = 20;
    let offset = 0;
    
    const emojiLeft = "⬅️";
    const emojiRight = "➡️";

    const sendListEmbed = async () => {
      const response = await pokedex.getList(offset, limit);
      return await embedSend.renderList(response);
    };

    await interaction.reply({
      content: ":arrows_counterclockwise: Pokedex Loading...",
      fetchReply: true,
    });

    const embed = await sendListEmbed();
    const message = await interaction.followUp({
      embeds: [embed],
      fetchReply: true,
    });

    await message.react(emojiLeft);
    await message.react(emojiRight);

    const collector = message.createReactionCollector({
      filter: (reaction, user) =>
        [emojiLeft, emojiRight].includes(reaction.emoji.name || "") &&
        !user.bot,
      time: 120_000,
    });

    collector.on("collect", async (reaction, user) => {

      await reaction.users.remove(user.id);

      if (reaction.emoji.name === emojiRight) {
        offset += limit;
      } else if (reaction.emoji.name === emojiLeft && offset >= limit) {
        offset -= limit;
      }

      const newEmbed = await sendListEmbed();
      await message.edit({ embeds: [newEmbed] });
    });

    collector.on("end", (collected, reason) => {
      console.log(
        `[COLLECTOR] Collector finalizado. Motivo: ${reason}. Reações coletadas: ${collected.size}`
      );
    });
  };
}
