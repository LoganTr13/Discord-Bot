import { SlashCommandBuilder } from "discord.js";

export default class Ship {
    public readonly data = new SlashCommandBuilder()
    .setName("ship")
    .setDescription("Vamos ver ser o casal vai dar certo ou não?")
    .addUserOption((option)=>
        option
        .setName("user1")
        .setDescription("Primeiro Pombinho")
        .setRequired(true)
    )
    .addUserOption((option)=>
        option
        .setName("user2")
        .setDescription("Segundo Pombinho")
        .setRequired(true)
    )

    public readonly execute = async (interaction:any) => {
        const user1:string = interaction.options.getUser("user1");
        const user2:string = interaction.options.getUser("user2");

        const usersConcat:string = user1 + user2;
        const sumFromCharCodes = [...usersConcat].reduce((sum, char)=> sum + char.charCodeAt(0),0);
        const compatibility = (sumFromCharCodes * 3) % 101;

        let text;

        switch (true) {
            case (compatibility === 0):
              text = ("Não rola... 🤢");
              break;
            case (compatibility <= 10):
              text = ("Não temos muita química... 😬");
              break;
            case (compatibility <= 20):
              text = ("A química é baixa, mas ainda há algo... 😅");
              break;
            case (compatibility <= 30):
              text = ("Pode melhorar, mas temos algo! 😐");
              break;
            case (compatibility <= 40):
              text = ("Estamos começando a esquentar... 😄");
              break;
            case (compatibility <= 50):
              text = ("É um bom começo! 😉");
              break;
            case (compatibility <= 60):
              text = ("Estamos quase lá! 😎");
              break;
            case (compatibility <= 70):
              text = ("Muito bem! Estamos nos entendendo! 🤗");
              break;
            case (compatibility <= 80):
              text = ("Ótima química! 😁");
              break;
            case (compatibility <= 90):
              text = ("A compatibilidade está excelente! ❤️");
              break;
            case (compatibility <= 99):
                text = ("Super compatível! 💖");
            break;
            case (compatibility === 100):
                text = ("ja podem casar");
            break;
            default:
              text = ("Erro: valor de compatibilidade inválido.");
              break;
        }

        const progressBar = '🟥'.repeat(Math.floor(compatibility/10)) + '⬜'.repeat(10 - Math.floor(compatibility/10))
        return await interaction.reply(text + ' \n ' + progressBar + " " + compatibility + "%");
    }

}