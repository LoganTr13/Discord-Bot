import Arr from "../../../../Utils/Arr";

export default class Pokemon {
  public id: number;
  public name: string;
  public icon: string;
  public types: string[];
  public hp: number;
  public attack: number;
  public defense: number;
  public special_attack: number;
  public special_defense: number;
  public speed: number;

  public static makeFromJson(data: object) {
    const pokemon = new Pokemon();
    pokemon.id = data['id'];
    pokemon.name = data['name'];
    pokemon.icon = Arr.get(data,'sprites.other.official-artwork.front_default');
    pokemon.getTypes(data['types']);
    pokemon.getStats(data['stats']);
    return pokemon;
  }

  private getTypes(types: object[]){
    this.types = types.map((typeData) => Arr.get(typeData, 'type.name')); // tlg que vai quebrar
  }
  private getStats(stats: object[]) {
    this.hp = Arr.get(stats, '0.base_stat', -1);
    this.attack = Arr.get(stats, '1.base_stat', -1);
    this.defense = Arr.get(stats, '2.base_stat', -1);
    this.special_attack = Arr.get(stats, '3.base_stat', -1);
    this.special_defense = Arr.get(stats, '4.base_stat', -1);
    this.speed = Arr.get(stats, '5.base_stat', -1);

  }
}
