import { SlashCommandBuilder } from "discord.js";

export default class Ship {
  public readonly data = new SlashCommandBuilder()
    .setName("ship")
    .setDescription("Vamos ver ser o casal vai dar certo ou não?")
    .addUserOption((option) =>
      option
        .setName("user1")
        .setDescription("Primeiro Pombinho")
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName("user2")
        .setDescription("Segundo Pombinho")
        .setRequired(true)
    );

  public readonly execute = async (interaction: any) => {
    const user1 = interaction.options.getUser("user1");
    const user2 = interaction.options.getUser("user2");

    const usersConcat: string = user1 + user2;
    const sumFromCharCodes = [...usersConcat].reduce(
      (sum, char) => sum + char.charCodeAt(0),
      0
    );
    const compatibility = (sumFromCharCodes * 3) % 101;

    let text;

    switch (true) {
      case compatibility === 0:
        text = "Vocês são inimigos Mortais :skull:";
        break;
      case compatibility <= 10:
        text = "Talvez conhecidos? :thinking:";
        break;
      case compatibility <= 20:
        text = "Se pá nem colegas :clown:";
        break;
      case compatibility <= 30:
        text = "Melhor ficar apenas na amizade :pleading_face:";
        break;
      case compatibility <= 40:
        text =
          "Para a amizade vocês são otimos, agora pra avançar... :confused:";
        break;
      case compatibility <= 50:
        text = "Ja são melhores amigos e isso esta otimo! :saluting_face:";
        break;
      case compatibility <= 60:
        text = "Hmmm... parece que a amizade pode ficar mais quente :fire:";
        break;
      case compatibility <= 70:
        text = "Imagino se algum dos dois tem crush um no outro :thinking:";
        break;
      case compatibility <= 80:
        text = "Já podem começar a namora :face_with_hand_over_mouth:";
        break;
      case compatibility <= 90:
        text = "E não tão namorando pq?! :eyes:";
        break;
      case compatibility <= 99:
        text = "O casamento é quando ? :smirk:";
        break;
      case compatibility === 100:
        text = "Ja tem casa, filhos e um carro :flushed:";
        break;
      default:
        text = "Erro: valor de compatibilidade inválido.";
        break;
    }

    const progressBar =
      "🟥".repeat(Math.floor(compatibility / 10)) +
      "⬜".repeat(10 - Math.floor(compatibility / 10));

    const userName1 = user1.username
    const userName2 = user2.username
    const nameShipp = userName1.slice(0,userName1.length / 2) + userName2.slice(-userName2.length / 2);
    
    return await interaction.reply(`
      💖 **O Amor está no ar! Vamos ver quem vai formar um duo?** 💖

      👩‍❤️‍👨 <@${user1.id}> + <@${user2.id}> = ${nameShipp}
  ${text}

      Compatibilidade:
      ${progressBar} **${compatibility}%**
      `);
  };
}
