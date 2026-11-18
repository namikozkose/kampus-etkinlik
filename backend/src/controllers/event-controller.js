import mongoose from "mongoose";
import { Event } from "../models/event.js";

const notFound = (res) =>
  res.status(404).json({ error: { message: "Event not found" } });

// Mongoose doğrulama hatası → 400, diğerleri genel hata yakalayıcıya (500)
function handleError(err, res, next) {
  if (err instanceof mongoose.Error.ValidationError) {
    const message = Object.values(err.errors).map((e) => e.message).join(", ");
    return res.status(400).json({ error: { message } });
  }
  next(err);
}

// İstemci _id / id gönderse bile kullanılmaz
function cleanBody(body) {
  const { _id, id, createdAt, updatedAt, ...rest } = body ?? {};
  return rest;
}

// GET /events (?category=Atölye isteğe bağlı)
export async function getEvents(req, res, next) {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const events = await Event.find(filter).sort({ date: 1, time: 1 });
    res.json(events);
  } catch (err) { next(err); }
}

// GET /events/:id
export async function getEventById(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);
    const event = await Event.findById(req.params.id);
    if (!event) return notFound(res);
    res.json(event);
  } catch (err) { next(err); }
}

// POST /events
export async function createEvent(req, res, next) {
  const { title, category, date } = req.body ?? {};
  if (!title || !category || !date) {
    return res.status(400).json({ error:
      { message: "title, category and date are required" } });
  }
  try {
    const event = await Event.create(cleanBody(req.body));
    res.status(201).json(event);
  } catch (err) { handleError(err, res, next); }
}

// PUT /events/:id ve PATCH /events/:id: gönderilen alanları günceller
export async function updateEvent(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      cleanBody(req.body),
      { returnDocument: "after", runValidators: true },
    );
    if (!event) return notFound(res);
    res.json(event);
  } catch (err) { handleError(err, res, next); }
}

// DELETE /events/:id
export async function deleteEvent(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return notFound(res);
    res.status(204).end();
  } catch (err) { next(err); }
}
