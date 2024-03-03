import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import ConversationsSidebar from "./ConversationsSidebar";
import ContactsSidebar from "./ContactsSidebar";
import NewContactModal from "./NewContactModal";
import NewConversationModal from "./NewConversationModal";

const ConversationsAndContacts = ({ id }) => {
  const [activeTab, setActiveTab] = useState("conversations");
  const [isAddContactOpen, setIsAddContactOpen] = useState(false);
  const [isAddConversationOpen, setIsAddConversationOpen] = useState(false);

  const buttons = [
    {
      text: "Conversations",
      type: "conversations",
      active: activeTab === "conversations",
    },
    {
      text: "Contacts",
      type: "contacts",
      active: activeTab === "contacts",
    },
  ];

  const openSelectedModal = () => {
    if (activeTab === "conversations") {
      return setIsAddConversationOpen(true);
    }
    return setIsAddContactOpen(true);
  };

  return (
    <Grid container direction="column" height="100%">
      <Grid item container p={2}>
        {buttons.map(({ text, active, type }) => (
          <Box
            key={type}
            sx={{
              borderBottom: active
                ? "2px solid #1976D2"
                : "2px solid transparent",
            }}
          >
            <Button
              variant={"text"}
              color={active ? "primary" : "inherit"}
              onClick={() => setActiveTab(type)}
              size="small"
            >
              {text}
            </Button>
          </Box>
        ))}
      </Grid>
      <Grid item flexGrow={1}>
        {activeTab === "conversations" ? (
          <ConversationsSidebar />
        ) : (
          <ContactsSidebar />
        )}
      </Grid>
      <Grid item container direction="column">
        <Grid item>
          <Box p={2}>
            <Typography variant="caption">Your Id: {id}</Typography>
          </Box>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={openSelectedModal}
          >
            New {activeTab === "conversations" ? "Conversation" : "Contact"}
          </Button>
        </Grid>
      </Grid>
      <NewContactModal
        isAddContactOpen={isAddContactOpen}
        setIsAddContactOpen={setIsAddContactOpen}
      />
      <NewConversationModal
        isAddConversationOpen={isAddConversationOpen}
        setIsAddConversationOpen={setIsAddConversationOpen}
      />
    </Grid>
  );
};

export default ConversationsAndContacts;
