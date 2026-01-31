import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandUserOption,
  User,
} from "discord.js";

const sentences = [
  { max: 0, message: "Vocês são inimigos Mortais :skull:" },
  { max: 10, message: "Talvez conhecidos? :thinking:" },
  { max: 20, message: "Se pá nem colegas :clown:" },
  { max: 30, message: "Melhor ficar apenas na amizade :pleading_face:" },
  { max: 40, message: "Para a amizade vocês são otimos, agora pra avançar... :confused:" },
  { max: 50, message: "Ja são melhores amigos e isso esta otimo! :saluting_face:" },
  { max: 60, message: "Hmmm... parece que a amizade pode ficar mais quente :fire:" },
  { max: 70, message: "Imagino se algum dos dois tem crush um no outro :thinking:" },
  { max: 80, message: "Já podem começar a namora :face_with_hand_over_mouth:" },
  { max: 90, message: "E não tão namorando pq?! :eyes:" },
  { max: 99, message: "O casamento é quando ? :smirk:" },
  { max: 100, message: "Ja tem casa, filhos e um carro :flushed:" },
];

const getCompatibilityMessage = (points: number): { message: string } => {
  const message = sentences.find(({ max }) => points <= max);
  if (!message) {
    return { message: " Tivemos um erro de compatibilidade ┐(￣ヘ￣;)┌" };
  }
  return message;
};

const renderProgressBar = (compatibility: number, size: number): string => {
  const amountEmoji = Math.floor(compatibility / 10);
  return "🟥".repeat(amountEmoji) + "⬜".repeat(size - amountEmoji);
};

const calcCompatibility = (id1: string, id2: string): number => {
  const combined = id1 + id2;
  const sumCharCodes = [...combined].reduce(
    (sum, char) => sum + char.charCodeAt(0),
    0
  );
  return (sumCharCodes * 3) % 101;
};
export default class Ship {
  public readonly data = new SlashCommandBuilder()
    .setName("ship")
    .setDescription("Vamos ver ser o casal vai dar certo ou não?")
    .addUserOption((option: SlashCommandUserOption) =>
      option
        .setName("user1")
        .setDescription("Primeiro Pombinho")
        .setRequired(true)
    )
    .addUserOption((option: SlashCommandUserOption) =>
      option
        .setName("user2")
        .setDescription("Segundo Pombinho")
        .setRequired(true)
    );

  public readonly execute = async ( interaction: ChatInputCommandInteraction ) => {
    const user1: User = interaction.options.getUser("user1", true);
    const user2: User = interaction.options.getUser("user2", true);

    const compatibility = calcCompatibility(user1.id, user2.id);

    const result = getCompatibilityMessage(compatibility);

    const userName1 = user1.username;
    const userName2 = user2.username;

    const nameShipp =
      userName1.slice(0, userName1.length / 2) +
      userName2.slice(-userName2.length / 2);

    return await interaction.reply(`
      💖 **O Amor está no ar! Vamos ver quem vai formar um duo?** 💖

      👩‍❤️‍👨 <@${user1.id}> + <@${user2.id}> = ${nameShipp}
  ${result.message}

      Compatibilidade:
      ${renderProgressBar(compatibility, 10)} **${compatibility}%**
      `);
  };
}
