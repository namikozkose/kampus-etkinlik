import mongoose from "mongoose";
import { formatDate, parseDate } from "../utils/date.js";

// Kurallar schema'da: required, trim, uzunluk sınırları, enum, min/default
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true,
    trim: true, minlength: 3, maxlength: 100 },
  category: { type: String, required: true,
    enum: ["Seminer", "Atölye", "Söyleşi", "Yarışma"] },
  capacity: { type: Number, min: 0, default: 0 },
  // API'de "15-10-2026", veritabanında gerçek Date
  date: { type: Date, required: true,
    set: parseDate, get: formatDate },
  time: { type: String, default: "" },
  location: { type: String, trim: true, default: "" },
  description: { type: String, trim: true,
    maxlength: 500, default: "" },
}, { timestamps: true, // createdAt, updatedAt
  toJSON: { getters: true }, id: false });

// Model adı "Event" → collection adı otomatik "events"
export const Event = mongoose.model("Event", eventSchema);
