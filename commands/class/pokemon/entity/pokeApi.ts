type responseList = {
  previous: string;
  next: string;
  results: {
    name: string;
    icon: string;
    url: string;
  }[];
};
export default class pokeApi {
  private readonly baseUrl: string = "https://pokeapi.co/api/v2/";

  public async getPokemon(search: string) {
    const url: string = `${this.baseUrl}pokemon${search}`;
    const data = await fetch(url).then((response) => response.json());
    return data;
  }
}
