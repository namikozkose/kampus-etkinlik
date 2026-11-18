import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./models/db.js";

const PORT = process.env.PORT || 3000;

try {
  await connectDB();
} catch (err) {
  console.error("Veritabanına bağlanılamadı:", err.message);
  process.exit(1);
}

app.listen(PORT, () =>
  console.log(`API: http://localhost:${PORT}`));
