const { SlashCommandBuilder, hyperlink, EmbedBuilder, IntegrationApplication } = require("discord.js");
const allah = require("../../../../../../config.json");
const children = require('child_process');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("restart")
    .setDescription("Moderasyon Botunu yeniden başlatmaya yarar."),

  async execute(interaction, client) {
   if(!allah.owners.includes(interaction.user.id)) {
        return interaction.reply({ content: ":x: Bot developerı olmadığın için kullanamazsın.", ephemeral: true })
    }
await interaction.reply({ content: `__**Bot**__ yeniden başlatılıyor!`, ephemeral: true });
children.exec(`pm2 restart ${allah.GuildName}_Voucher ${allah.GuildName}_Statistics ${allah.GuildName}_Moderation`);
}
};