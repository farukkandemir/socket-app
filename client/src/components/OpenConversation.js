import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useConversation } from "../context/ConversationsProvider";

const OpenConversation = ({ id }) => {
  const { selectedConversation, sendMessage } = useConversation();
  const { messages } = selectedConversation || [];
  const [messageText, setMessageText] = useState("");

  const handleMessage = () => {
    sendMessage({
      recipients: selectedConversation.recipients.map(
        (recipient) => recipient.id
      ),
      text: messageText,
    });
    return setMessageText("");
  };

  return (
    <Box
      sx={{
        height: "100%",
        padding: "1rem",
      }}
    >
      <Stack direction={"column"} justifyContent="space-between" height="100%">
        <Box>
          {!!messages.length && (
            <Grid container direction="column" spacing={2}>
              {messages.map((message, index) => (
                <Grid
                  item
                  container
                  direction="column"
                  key={index}
                  alignItems={
                    message.sender === "Admin" || message.fromMe
                      ? "flex-end"
                      : "flex-start"
                  }
                >
                  <Grid item width="fit-content">
                    <Typography
                      variant="subtitle2"
                      sx={{
                        lineHeight: 1,
                        backgroundColor:
                          message.sender === "Admin"
                            ? "info.light"
                            : message.fromMe
                            ? "success.main"
                            : "grey",
                        color: "white",
                        padding: "0.5rem",
                        borderRadius: "0.5rem",
                      }}
                    >
                      {message.text}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="caption" color="textSecondary">
                      {message.fromMe ? "You" : message.senderName}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
        <Stack direction={"row"}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message"
            size="small"
            multiline
            rows={3}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={() => {
              return handleMessage();
            }}
            disabled={!messageText}
          >
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default OpenConversation;
