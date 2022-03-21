const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3001",
  },
});

let users = {};

function addUser(userId, socketId) {
  !users[userId] && (users[userId] = socketId);
}

io.on("connection", (socket) => {
  // on connect
  console.log("connected");

  // save user id
  socket.on("join", (userId) => {
    addUser(userId, socket.id);
    io.emit("users", users);
  });

  // send and receive message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const receiver = users[receiverId];

    if (receiver) {
      io.to(receiver).emit("message", {
        senderId,
        text,
      });
    }
  });

  // on disconnect
  socket.on("disconnect", () => {
    const userId = Object.keys(users).find(
      (userId) => users[userId] === socket.id
    );

    delete users[userId];

    io.emit("users", users);
  });
});
