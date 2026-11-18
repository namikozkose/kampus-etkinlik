import express from "express";
import cors from "cors";
import { connectDB } from "./models/db.js";
import eventRoutes from "./routes/event-routes.js";

const app = express();
app.use(cors());
app.use(express.json()); // JSON body → req.body
app.use(express.urlencoded({ extended: true })); // form body (x-www-form-urlencoded)

app.get("/", (req, res) => {
  res.json({ name: "Kampüs Etkinlikleri API", health: "/health", events: "/events" });
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    student: "2416501021",
  });
});

// Veritabanı gerektiren route'lardan önce bağlantıyı garanti et
app.use("/events", async (req, res, next) => {
  try { await connectDB(); next(); } catch (err) { next(err); }
}, eventRoutes);

app.use((req, res) => { // eşleşme yoksa
  res.status(404).json({ error: { message: "Route not found" } });
});

app.use((err, req, res, next) => { // beklenmeyen hata
  const status = err.type === "entity.parse.failed" ? 400 : 500;
  if (status === 500) console.error(err);
  const message = status === 400 ? "Invalid JSON body" : "Server error";
  res.status(status).json({ error: { message } });
});

export default app;
