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

// join request approved notidication
router.post(
  "/join-request-approved",
  verifyToken,
  notificatinController.joinRequestApproved
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

// clear all notifications
router.put(
  "/:userId/clear",
  verifyToken,
  notificatinController.clearNotifications
);

module.exports = router;
