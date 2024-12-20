const { PermissionsBitField, EmbedBuilder } = require('discord.js');
const ayar = require("../../../../src/configs/sunucuayar.json")
const Ayarlar = require("../../../../src/configs/sunucuayar.json");
const { cyronixRed , cyronixTik } = require("../../../../src/configs/emojis.json")
const isimler = require("../../../../src/schemas/names");
const moment = require("moment")
moment.locale("tr")


module.exports = {
  conf: {
    aliases: ["isim", "i", "nick"],
    name: "isim",
    help: "isim <@cyr0nix/ID> <Isim> <Yaş>",
    category: "kayıt",
  },

  run: async (client, message, args, perm, prefix) => {
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!Ayarlar.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !Ayarlar.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) 
    {
    message.react(cyronixRed)
    message.reply({ content:`Yetkin bulunmamakta.\Yetkili olmak istersen başvurabilirsin.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if(!uye) 
    {
    message.react(cyronixRed)
    message.reply({ content:`\`${prefix}isim <ID> <Isim> <Yaş>\``}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if(message.author.id === uye.id) 
    {
    message.react(cyronixRed)
    message.reply({ content:`Kendi ismini değiştiremezsin. Booster isen \`${prefix}zengin\``}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if(!uye.manageable) 
    {
    message.react(cyronixRed)
    message.reply({ content:`Böyle birisinin ismini değiştiremiyorum.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if(message.member.roles.highest.position <= uye.roles.highest.position) 
    {
    message.react(cyronixRed)
    message.reply({ content:`Senden yüksekte olan birisinin ismini değiştiremezsin.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    const data = await isimler.findOne({ guildID: message.guild.id, userID: uye.user.id });
    args = args.filter(a => a !== "" && a !== " ").splice(1);
    let setName;
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
    let yaş = args.filter(arg => !isNaN(arg))[0] || "";
    if(!isim && !yaş) 
    {
    message.react(cyronixRed)
    message.reply({ content:`\`${prefix}isim <ID> <Isim> <Yaş>\``}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if(!yaş) 
    { setName = `${uye.user.displayName.includes(ayar.tag) ? ayar.tag : (ayar.ikinciTag ? ayar.ikinciTag : (ayar.tag || ""))} ${isim}`;
    } else { setName = `${uye.user.displayName.includes(ayar.tag) ? ayar.tag : (ayar.ikinciTag ? ayar.ikinciTag : (ayar.tag || ""))} ${isim} | ${yaş}`;
  } uye.setNickname(`${setName}`).catch(err => message.reply({ content:`İsim çok uzun.`}))

    message.react(cyronixTik)

let ozi = new EmbedBuilder()
.setDescription(`
${uye.toString()} üyesinin ismi "${setName}" olarak değiştirildi, bu üye daha önce bu isimlerle kayıt olmuş.

${cyronixRed} üyesinin toplamda **${data ? `${data.names.length}` : "0"}** isim kayıtı bulundu
${data ? data.names.splice(-3).map((x, i) => `\` ${i + 1} \` \` ${x.name} \` ${x.sebep ? `(${x.sebep})` : ""} ${x.rol ? `(${x.rol})` : ""}`).join("\n") : "Daha önce kayıt olmamış."}
`)
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
.setFooter({ text: `Üyesinin önceki isimlerine <!isimler ID> komutuyla bakarak kayıt işlemini gerçekleştirmeniz önerilir.` });

message.reply({ embeds: [ozi] })

await isimler.findOneAndUpdate({ guildID: message.guild.id, userID: uye.user.id }, { $push: { names: { name: setName, yetkili: message.author.id,  rol: "İsim Değiştirme", date: Date.now() } } }, { upsert: true });

}   }
