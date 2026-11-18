import { Router } from "express";
import { getEvents, getEventById, createEvent,
  updateEvent, deleteEvent } from "../controllers/event-controller.js";

const router = Router();
router.route("/")
  .get(getEvents)
  .post(createEvent);
router.route("/:id")
  .get(getEventById)
  .put(updateEvent)
  .patch(updateEvent)
  .delete(deleteEvent);
export default router;
