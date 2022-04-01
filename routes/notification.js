const exporess = require("express");
const router = exporess.Router({ mergeParams: true });
const notificatinController = require("../controllers/notificationController");
const verifyToken = require("../config/verifyToken");

// create new postRequest notification
router.post(
  "/requestNotification",
  verifyToken,
  notificatinController.requestNotification
);

// comment and reply notification
router.post(
  "/activityNotification",
  verifyToken,
  notificatinController.activityNotfication
);

// get an user's notifications
router.get("/:userId", notificatinController.getNotifications);

// delete a notification
router.delete(
  "/:notificationId",
  verifyToken,
  notificatinController.deleteNotification
);

// mark notification as seen
router.put(
  "/:notificationId/mark",
  verifyToken,
  notificatinController.markAsSeen
);

module.exports = router;
