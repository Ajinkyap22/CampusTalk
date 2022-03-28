const Chat = require("../models/chat");
const Message = require("../models/message");

// create new chat
exports.createChat = async (req, res) => {
  try {
    const { members } = req.body;
    let chat = new Chat({ members });
    await chat.save();

    Chat.populate(chat, { path: "members" }, (err, newChat) => {
      if (err) return res.status(500).json({ error: err.message });

      res.status(201).json(newChat);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get an user's chats
exports.getChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      members: { $in: [req.params.userId] },
    }).populate("members");

    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get a chat's messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender")
      .populate("receiver");

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// send a text message
exports.sendMessage = async (req, res) => {
  try {
    const { text, sender, receiver, chat } = req.body;

    let message = new Message({
      text,
      sender,
      receiver,
      chat,
    });

    await message.save();

    // populate sender and receiver
    Message.populate(message, { path: "sender" }, (err, msg) => {
      if (err) return res.status(500).json({ error: err.message });

      Message.populate(msg, { path: "receiver" }, (err, msg) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(201).json(msg);
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// send a file message
exports.sendFileMessage = async (req, res) => {
  try {
    const { sender, receiver, chat } = req.body;

    const filename = JSON.parse(req.body.originalFileName);

    const file = req.file.filename;

    const message = new Message({
      file,
      sender,
      receiver,
      chat,
      originalFileName: filename,
    });

    await message.save();

    // populate sender and receiver
    Message.populate(message, { path: "sender" }, (err, msg) => {
      if (err) return res.status(500).json({ error: err.message });

      Message.populate(msg, { path: "receiver" }, (err, msg) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(201).json(msg);
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete a message
exports.deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.messageId);

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    await Message.deleteOne({ _id: req.params.messageId });

    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete a chat
exports.deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId);

    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    await Chat.deleteOne({ _id: req.params.chatId });

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// clear a chat
exports.clearChat = async (req, res) => {
  try {
    let chat = await Chat.findById(req.params.chatId);

    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    await Message.deleteMany({ chat: req.params.chatId });

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
