type GetPokemonsListResponse = {
  previous: string | null;
  next: string | null;
  results: { name: string; url: string }[];
};

type GetPokemonResponse = {
  id: number;
  name: string;
  types: string[];
  sprites: { other: { "official-artwork": { front_default: string } } };
  stats: { base_stat: number }[];
};

export default class PokeApi {
  private readonly baseUrl: string = "https://pokeapi.co/api/v2";

  public async getPokemons() {
    const url: string = `${this.baseUrl}/pokemon`;
    return await fetch(url).then<GetPokemonsListResponse>((response) =>
      response.json()
    );
  }

  public async getPokemon(id: string | number) {
    const url: string = `${this.baseUrl}/pokemon/${id}`;
    return await fetch(url)
      .then<GetPokemonResponse>((response) => response.json())
      .catch((error) => error.message);
  }
}
