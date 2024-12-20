const mongoose = require("mongoose");
const allah = require("../../../../../config.json");

mongoose.set('strictQuery', true);
mongoose.connect(allah.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
  console.log("Database bağlantısı tamamlandı!");
});
mongoose.connection.on("error", () => {
  console.error("[HATA] Database bağlantısı kurulamadı!");
});


db.vote_schemas.find({ user_id: "348810453478277131" })