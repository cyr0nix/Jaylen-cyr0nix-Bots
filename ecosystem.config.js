let allah = require('./config.json');

let botcuk = [
      {
        name: `${allah.GuildName}_Moderation`,
        namespace: `${allah.GuildName}`,
        script: 'index.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Bots/Triple/Main"
      },
      {
        name: `${allah.GuildName}_Voucher`,
        namespace: `${allah.GuildName}`,
        script: 'index.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Bots/Triple/Vouchery"
      },
      {
        name: `${allah.GuildName}_Statistics`,
        namespace: `${allah.GuildName}`,
        script: 'index.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Bots/Triple/Stat"
      },
      {
        name: `${allah.GuildName}_Guard_I`,
        namespace: `${allah.GuildName}`,
        script: 'index.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Bots/Shields/Guard_I"
      },
      {
        name: `${allah.GuildName}_Guard_II`,
        namespace: `${allah.GuildName}`,
        script: 'index.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Bots/Shields/Guard_II"
      },
      {
        name: `${allah.GuildName}_Guard_III`,
        namespace: `${allah.GuildName}`,
        script: 'index.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Bots/Shields/Guard_III"
       }
    ]
    if(allah.Welcome.Active) {
      botcuk.push(
        {
          name: `${allah.GuildName}_Welcomes`,
          namespace: `${allah.GuildName}`,
          script: 'Start.js',
          watch: false,
          exec_mode: "cluster",
          max_memory_restart: "2G",
          cwd: "./Bots/Welcomes"
        }
      )
    }
  module.exports = {
    apps: botcuk
  };