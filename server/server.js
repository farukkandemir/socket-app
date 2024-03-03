import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const PORT = process.env.PORT || 5000;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: "http://localhost:3000",
});

io.on("connection", (socket) => {
  const id = socket.handshake.query.id;

  socket.join(id);

  socket.on("send-message", (data) => {
    const { recipients, text } = data;

    recipients.forEach((recipient) => {
      const filteredRecipients = recipients.filter((r) => r !== recipient);
      const newRecipients = [...filteredRecipients, id];
      socket.broadcast.to(recipient).emit("receive-message", {
        recipients: newRecipients,
        sender: id,
        text,
      });
    });
  });

  socket.on("typing", (data) => {
    const { sender, recipients } = data;

    console.log(data);

    recipients.forEach((recipient) => {
      socket.broadcast.to(recipient).emit("send-typing", {
        message: `${sender} is typing...`,
      });
    });
  });
});

httpServer.listen(PORT, () => console.log(`Server Listening on ${PORT}`));
