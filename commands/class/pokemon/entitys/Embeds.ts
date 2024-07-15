import { EmbedBuilder } from "discord.js";

type entityPokemon = {
  id: number;
  name: string;
  icon: string;
  types: string[];
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
};

export default class Embeds {
  public renderPokemon(pokemon: entityPokemon) {
    return new EmbedBuilder()
      .setColor(0xf01e27)
      .setTitle(pokemon.name)
      .setDescription("ID: " + pokemon.id.toString())
      .setFields(
        { name: "HP", value: pokemon.hp.toString() },
        { name: "Attack", value: pokemon.attack.toString() },
        { name: "Defense", value: pokemon.defense.toString() },
        { name: "Special Attack", value: pokemon.special_attack.toString() },
        { name: "Special Defense", value: pokemon.special_defense.toString() },
        { name: "Speed", value: pokemon.speed.toString() }
      )
      .setThumbnail(pokemon.icon);
  }
  public renderList(list: entityPokemon[]) {
    const pokeList: { name: string; value: string }[] = list.map((pokemon) => {
      return { name: pokemon.name, value: pokemon.icon };
    });
    return new EmbedBuilder()
      .setColor(0xf01e27)
      .setTitle("Pokedex")
      .setFields(pokeList);
  }
}
