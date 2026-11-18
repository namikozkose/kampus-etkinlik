import mongoose from "mongoose";

export const CATEGORIES = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, enum: CATEGORIES },
    capacity: { type: Number, min: 0, default: 0 },
    date: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ }, // YYYY-MM-DD
    time: { type: String, default: "" },
    location: { type: String, default: "" },
    description: { type: String, default: "" },
    image: String,
  },
  {
    timestamps: true, // createdAt, updatedAt
    // JSON'da _id yerine id: frontend'deki CampusEvent tipiyle aynı şekil
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => { delete ret._id; return ret; },
    },
  },
);

// model adı, şema, koleksiyon adı
export const Event = mongoose.model("event", eventSchema, "events");
