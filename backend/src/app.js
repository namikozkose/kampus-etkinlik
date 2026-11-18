import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event-routes.js";

const app = express();
app.use(cors());
app.use(express.json()); // body → req.body

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    student: "2416501021",
  });
});

app.use("/events", eventRoutes);

app.use((req, res) => { // eşleşme yoksa
  res.status(404).json({ error: { message: "Route not found" } });
});

app.use((err, req, res, next) => { // hata yakalayıcı
  console.error(err.message);
  if (err.type === "entity.parse.failed") { // bozuk JSON body
    return res.status(400).json({ error: { message: "Invalid JSON body" } });
  }
  res.status(500).json({ error: { message: "Server error" } });
});

export default app;
