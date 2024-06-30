import { SlashCommandBuilder } from "discord.js";
import infoPokedex from "./class/pokemon/pokemons";

export default class pokedex{
    infoPoke:infoPokedex;
    constructor(){
        this.infoPoke = new infoPokedex();
    }
    public readonly data = new SlashCommandBuilder()
    .setName('pokedex')
    .setDescription('Consulta infomações dos pokemons');

    public readonly execute = async (interaction:any) => {

    }
}