import mongoose from "mongoose";
import "./event.js"; // modeli kaydet

// Adres .env'deki MONGODB_URI'den gelir (Atlas). Yoksa yerel MongoDB.
const LOCAL_URI = "mongodb://localhost:27017/kampus";

mongoose.connection.on("connected", () =>
  console.log(`MongoDB bağlandı: ${mongoose.connection.host}/${mongoose.connection.name}`));
mongoose.connection.on("error", (err) =>
  console.log("MongoDB bağlantı hatası:", err.message));
mongoose.connection.on("disconnected", () =>
  console.log("MongoDB bağlantısı kesildi"));

// Bağlantı bir kez açılır, sonraki çağrılar aynı Promise'i bekler
// (Vercel'de her istek connectDB'yi çağırır, yeniden bağlanmaz).
let connecting = null;
export function connectDB() {
  if (mongoose.connection.readyState === 1) return Promise.resolve();
  if (!connecting) {
    const uri = process.env.MONGODB_URI || LOCAL_URI;
    connecting = mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 })
      .catch((err) => { connecting = null; throw err; });
  }
  return connecting;
}

// Uygulama kapanınca (Ctrl+C) bağlantıyı düzgün kapat
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Bağlantı kapatıldı");
  process.exit(0);
});
