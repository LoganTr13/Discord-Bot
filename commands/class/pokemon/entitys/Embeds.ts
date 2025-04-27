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
const emojiPokeball = "<:Pokeball:1365917866741993572>"
export default class Embeds {
  public renderPokemon(pokemon: entityPokemon) {
    return new EmbedBuilder()
      .setColor(0xf01e27)
      .setTitle(emojiPokeball + " " + pokemon.name)
      .setDescription("ID: " + pokemon.id.toString())
      .setFields(
        { name: "HP", value: pokemon.hp.toString(), inline:true },
        { name: "Attack", value: pokemon.attack.toString(), inline:true  },
        { name: "Defense", value: pokemon.defense.toString(), inline:true  },
        { name: "Speed", value: pokemon.speed.toString(), inline:true  },
        { name: "Special Attack", value: pokemon.special_attack.toString(), inline:true  },
        { name: "Special Defense", value: pokemon.special_defense.toString(), inline:true  }
      )
      .setThumbnail(pokemon.icon);
  }
  public renderList(list: entityPokemon[]) {
    console.log(list)
    const pokeList: { name: string; value: string }[] = list.map((pokemon) => {
      return { name: emojiPokeball + " " + pokemon.name + " - [ " + pokemon.id.toString() +" ]", value: " ", inline:true};
    });
    return new EmbedBuilder()
      .setColor(0xf01e27)
      .setTitle("Pokedex")
      .setFields(pokeList);
  }
}
