import { Divider, Grid } from "@mui/material";
import React from "react";

import OpenConversation from "./OpenConversation";
import ConversationsAndContacts from "./ConversationsAndContacts";
import { useConversation } from "../context/ConversationsProvider";

const Dashboard = ({ id }) => {
  const { selectedConversation } = useConversation();

  return (
    <Grid container height="100vh">
      <Grid
        item
        sx={{
          width: "250px",
        }}
      >
        <ConversationsAndContacts id={id} />
      </Grid>
      <Divider orientation="vertical" />
      <Grid item flex={1}>
        {selectedConversation && <OpenConversation id={id} />}
      </Grid>
    </Grid>
  );
};

export default Dashboard;
