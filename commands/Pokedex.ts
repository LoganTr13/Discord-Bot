import {SlashCommandBuilder} from "discord.js";
import Pokemons from "./class/pokemon/pokemons";
import Embeds from "./class/pokemon/entitys/Embeds";

export default class Pokedex {
  public readonly data = new SlashCommandBuilder()
    .setName("pokedex")
    .setDescription("Consulta infomações dos pokemons.")
    .addStringOption((option) =>
      option
        .setName("pokemon")
        .setDescription("Pesquisa um pokemon")
        .setRequired(false)
    );

  public readonly execute = async (interaction: any) => {
    const pokedex = new Pokemons();
    let query = interaction.options.getString("pokemon");
    const embedSend = new Embeds();
    if (query) {
      const response = await pokedex.getPokemon(query);
      if (!response) {
        interaction.reply('Pokemon não encontrado!');
        return;
      }
      await interaction.reply('Pokemon Localizado!')
      return await interaction.channel.send({
        embeds: [await embedSend.renderPokemon(response)],
      })
      ;
    };
    const response = await pokedex.getList();
    console.log(response)
    return await interaction.reply();
  };
}
