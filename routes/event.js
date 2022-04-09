const express = require("express");
const router = express.Router({ mergeParams: true });
const { upload, uploadDocs, uploadVideos } = require("../config/multer");
const verifyToken = require("../config/verifyToken");
const eventController = require("../controllers/eventController");

// create event
router.post("/create-event", verifyToken, eventController.createEvent);

// upload event images
router.post(
  "/:eventId/upload-event-images",
  upload.array("images", 5),
  eventController.uploadEventImages
);

// upload event video
router.post(
  "/:eventId/upload-event-video",
  uploadVideos.single("video"),
  verifyToken,
  eventController.uploadEventMedia
);

// upload event doc
router.post(
  "/:eventId/upload-event-document",
  uploadDocs.single("document"),
  verifyToken,
  eventController.uploadEventMedia
);

// delete event image
router.post(
  "/:eventId/delete-event-image",
  verifyToken,
  eventController.deleteEventImage
);

// delete event video or doc
router.post(
  "/:eventId/delete-event-media",
  verifyToken,
  eventController.deleteEventMedia
);

// get all events of a forum
router.get("/:forumId/events", eventController.getEvents);

// get event by id
router.get("/:eventId", eventController.getEvent);

// get all events of a user's forums
router.get("/:userId/user-events", eventController.getUserEvents);

// update event info
router.put("/:eventId/update-event", verifyToken, eventController.updateEvent);

// delete event
router.delete("/:eventId", verifyToken, eventController.deleteEvent);

module.exports = router;
