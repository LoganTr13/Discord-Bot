import PokeApi from "./pokeApi/pokeApi";
import Pokemon from "./entitys/Pokemon";
export default class Pokemons {
  private readonly api: PokeApi = new PokeApi();
  private limit: number = 10;

  public setLimit(value: number) {
    this.limit = value;
  }

  public async getList() {
    const response = await this.api.getPokemons();
    const pokemons = response.results.map(async (result) => {
      const pokemonData = await this.getPokemon(result.name);
      return Pokemon.makeFromJson(pokemonData);
    });   
    return await Promise.all(pokemons); 
  }
  public async getPokemon(query: string){
    const response = await this.api.getPokemon(query);
    if (typeof response != 'object') {
      return false;
    }
    return Pokemon.makeFromJson(response);
  }
}
