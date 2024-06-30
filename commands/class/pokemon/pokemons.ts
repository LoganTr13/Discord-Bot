import pokeApi from "./entity/pokeApi";
export default class infoPokedex {
  private readonly api: pokeApi;
  private limit: number;

  constructor() {
    this.api = new pokeApi();
    this.limit = 10;
  }

  public setLimit(value: number) {
    this.limit = value;
  }

  public async getList(url: string = `?offset=0&limit=${this.limit}`) {
    try {
      const baseUrl: string = "https://pokeapi.co/api/v2/pokemon";
      const data = await this.api.getPokemon(url);
      const previous =
        data.previous != null ? data.previous.replace(baseUrl, "") : null;
      const next = data.next != null ? data.next.replace(baseUrl, "") : null;
      const pokemons = data.results.map((entity) => {
        const id = entity.url.replace(baseUrl, "").split("/").join("");
        const name = entity.name;
        return {
          id: id,
          name: name,
        };
      });
      return {
        previous: previous,
        next: next,
        pokemons: pokemons,
      };
    } catch (error) {
      return error;
    }
  }

  public async getEntity(search: string) {
    try {
      const data = await this.api
        .getPokemon(`/${search}`)
        .then((entity) => this.getDetails(entity));
      return data;
    } catch (error) {
      return error;
    }
  }

  private getDetails(pokemon: any) {
    console.log(pokemon);
    const getTypes = pokemon.types.map((data: any) => data.type.name);
    const result = {
      id: pokemon.id,
      name: pokemon.name,
      icon: pokemon.sprites.other["official-artwork"].front_default,

      types: getTypes,

      hp: pokemon.stats[0].base_stat,
      attack: pokemon.stats[1].base_stat,
      defense: pokemon.stats[2].base_stat,
      special_attack: pokemon.stats[3].base_stat,
      special_defense: pokemon.stats[4].base_stat,
      speed: pokemon.stats[5].base_stat,
    };
    return result;
  }
}
