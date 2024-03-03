import React, { useState } from "react";
import ModalLayout from "./ModalLayout";
import { Button, Checkbox, Grid, Typography } from "@mui/material";
import { useContacts } from "../context/ContactsProvider";
import { useConversation } from "../context/ConversationsProvider";

const NewConversationModal = ({
  isAddConversationOpen,
  setIsAddConversationOpen,
}) => {
  const { contacts } = useContacts();
  const { createConversation } = useConversation();
  const [selectedContacts, setSelectedContacts] = useState([]);

  const handleCheckboxChange = (contactId) => {
    return setSelectedContacts((prevSelectedContacts) => {
      if (prevSelectedContacts.includes(contactId)) {
        return prevSelectedContacts.filter((prevId) => prevId !== contactId);
      }
      return [...prevSelectedContacts, contactId];
    });
  };

  return (
    <ModalLayout
      open={isAddConversationOpen}
      onClose={() => setIsAddConversationOpen(false)}
      title={"Add Conversation"}
    >
      <Grid container direction="column" rowGap={2}>
        {contacts.map((contact, index) => (
          <Grid item key={index}>
            <Grid container alignItems="center" columnGap={2}>
              <Grid item>
                <Checkbox
                  color="primary"
                  value={selectedContacts.includes(contact.id)}
                  onChange={() => handleCheckboxChange(contact.id)}
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              </Grid>
              <Grid item>
                <Typography variant="body1">{contact.name}</Typography>
              </Grid>
            </Grid>
          </Grid>
        ))}

        <Grid item>
          <Button
            variant="contained"
            fullWidth
            size="small"
            onClick={() => {
              createConversation(selectedContacts);
              setSelectedContacts([]);
              return setIsAddConversationOpen(false);
            }}
          >
            Start Conversation
          </Button>
        </Grid>
      </Grid>
    </ModalLayout>
  );
};

export default NewConversationModal;
