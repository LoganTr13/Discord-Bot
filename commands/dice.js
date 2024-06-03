import { SlashCommandBuilder, range } from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('d')
		.setDescription('Roll dice')
		.addIntegerOption(option =>
			option.setName('sides')
				.setDescription('Quantidade de lados do dado')
				.setRequired(true))
		.addStringOption(option => 
			option.setName('mod')
				.setDescription('Modificador do dado (Opcional)')),
	async execute(interaction) {
		let sides = interaction.options.getInteger('sides');
		let mod = interaction.options.getString('mod');
		let responseMod = '';
		const dices = [2,4,6,8,10,12,20,100]
		for (let i = 0; i < dices.length - 1; i++) {
			if (sides <= dices[i]) {
				sides = dices[i];
				break;
			}
		}
		const result = (Math.floor(Math.random() * sides) + 1);
		if (mod != null) {						
			mod = mod.replace(/[^0-9*/()+-]/g,'');//filtra os caracteres
			mod = mod[0] == "("? "+" + mod : mod;
			responseMod = "\n Result: " + result + "\t Mod: " + mod;
		}
		const diceSides = String(sides);
		const resultPrint = String(eval(result + mod));
		await interaction.reply(":game_die: D"+ diceSides + ": " + resultPrint + responseMod);
	}
};
