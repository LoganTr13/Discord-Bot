import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandIntegerOption,
  SlashCommandStringOption,
} from "discord.js";

const filterModifier = (modifier: string) => {
  return modifier.replace(/[^0-9*/()+-]/g, "");
};
const normalizeModifier = (modifier: string) => {
  return modifier[0] == "(" ? "+" + modifier : modifier;
};
export default class Dice {
  private readonly rollableDices: number[] = [2, 4, 6, 8, 10, 12, 20, 100];

  public readonly data = new SlashCommandBuilder()
    .setName("d")
    .setDescription("Roll dice")
    .addIntegerOption((option: SlashCommandIntegerOption) =>
      option
        .setName("sides")
        .setDescription("Quantidade de lados do dado")
        .setRequired(true)
    )
    .addStringOption((option: SlashCommandStringOption) =>
      option.setName("mod").setDescription("Modificador do dado (Opcional)")
    );

  public readonly execute = async ( interaction: ChatInputCommandInteraction ) => {
    let sides: number = interaction.options.getInteger("sides", true);
    let modifier: string | null = interaction.options.getString("mod");
    let responseModifier = "";

    // Corrige dado informado para um Dado Rolavel
    for (let i = 0; i < this.rollableDices.length - 1; i++) {
      if (sides > this.rollableDices[i]) break;
      sides = this.rollableDices[i];
    }

    const rolledValue = Math.floor(Math.random() * sides) + 1;

    if (modifier) {
      modifier = filterModifier(modifier);
      modifier = normalizeModifier(modifier);
      responseModifier =
        "\n Result: " + rolledValue + "\t modifier: " + modifier;
    } else {
      modifier = "";
    }

    const resultPrint =
      typeof modifier === "string" ? eval(rolledValue + modifier) : rolledValue;
    await interaction.reply(
      ":game_die: D" + sides + ": " + resultPrint + responseModifier
    );
  };
}
