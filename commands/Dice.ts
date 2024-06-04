import {
  SlashCommandBuilder,
  SlashCommandIntegerOption,
  SlashCommandStringOption,
} from "discord.js";
export default class Dice {
  private readonly dices: number[] = [2, 4, 6, 8, 10, 12, 20, 100];
  public readonly data = new SlashCommandBuilder()
    .setName("d")
    .setDescription("Roll dice")
    .addIntegerOption(this.optionSides)
    .addStringOption(this.optionMod);

  optionSides(option: SlashCommandIntegerOption) {
    return option
      .setName("sides")
      .setDescription("Quantidade de lados do dado")
      .setRequired(true);
  };

  optionMod(option: SlashCommandStringOption) {
    return option
      .setName("mod")
      .setDescription("Modificador do dado (Opcional)");
  };

  public readonly execute = async (interaction: any) => {
    let sides = interaction.options.getInteger("sides");
    let mod = interaction.options.getString("mod");
    let responseMod = "";

    for (let i = 0; i < this.dices.length - 1; i++) {
      if (sides > this.dices[i]) break;
      sides = this.dices[i];
    }

    const result = Math.floor(Math.random() * sides) + 1;

    if (mod) {
      mod = mod.replace(/[^0-9*/()+-]/g, ""); //filtra os caracteres
      mod = mod[0] == "(" ? "+" + mod : mod;
      responseMod = "\n Result: " + result + "\t Mod: " + mod;
    }

    const resultPrint = eval(result + mod);
    await interaction.reply(
      ":game_die: D" + sides + ": " + resultPrint + responseMod
    );
  };
}
