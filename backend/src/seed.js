// npm run seed → events koleksiyonunu boşaltır ve 6 başlangıç etkinliğini ekler.
// MONGODB_URI hangi veritabanını gösteriyorsa (yerel ya da Atlas) oraya yazar.
import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "./models/db.js";
import { Event } from "./models/event.js";
import { events } from "./data/events.js";

await connectDB();
const { deletedCount } = await Event.deleteMany({});
const inserted = await Event.insertMany(events);
console.log(`${deletedCount} kayıt silindi, ${inserted.length} etkinlik eklendi.`);
await mongoose.connection.close();
