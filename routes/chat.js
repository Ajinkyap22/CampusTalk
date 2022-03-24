const express = require("express");
const router = express.Router({ mergeParams: true });
const { upload, uploadDocs, uploadVideos } = require("../config/multer");
const verifyToken = require("../config/verifyToken");
const chatController = require("../controllers/chatController");

// create new chat
router.post("/new-chat", verifyToken, chatController.createChat);

// get an user's chats
router.get("/:userId", chatController.getChats);

// get a chat's messages
router.get("/messages/:chatId", chatController.getMessages);

// send a text message
router.post("/send-message", verifyToken, chatController.sendMessage);

// send an image message
router.post(
  "/send-image",
  verifyToken,
  upload.single("file"),
  chatController.sendFileMessage
);

// send a video message
router.post(
  "/send-video",
  verifyToken,
  uploadVideos.single("file"),
  chatController.sendFileMessage
);

// send a document message
router.post(
  "/send-doc",
  verifyToken,
  uploadDocs.single("file"),
  chatController.sendFileMessage
);

// delete a message
router.delete(
  "/delete-message/:messageId",
  verifyToken,
  chatController.deleteMessage
);

// delete a chat
router.delete("/delete-chat/:chatId", verifyToken, chatController.deleteChat);

// clear a chat
router.delete("/clear-chat/:chatId", verifyToken, chatController.clearChat);

module.exports = router;
