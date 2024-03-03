import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useConversation } from "../context/ConversationsProvider";

const ConversationsSidebar = () => {
  const { conversations, setSelectedConversation } = useConversation();

  return (
    <Box>
      {!!conversations.length ? (
        <Box
          sx={{
            px: 2,
            py: 1,
            height: "100%",
          }}
        >
          <Grid container direction="column" rowGap={2}>
            {conversations.map(({ recipients, selected }, index) => (
              <Grid
                item
                key={index}
                sx={{
                  cursor: "pointer",
                  backgroundColor: selected ? "success.light" : "grey.200",
                  borderRadius: 1,
                  p: 1,
                }}
                onClick={() => setSelectedConversation(index)}
              >
                <Typography
                  variant="caption"
                  fontWeight="bold"
                  color={selected ? "white" : "inherit"}
                >
                  {recipients.map((recipient) => recipient.name).join(", ")}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Box
          sx={{
            pl: 2,
            py: 1,
            height: "100%",
          }}
        >
          <Typography variant="caption" fontStyle="italic" fontWeight="bold">
            No Conversations Yet
          </Typography>
        </Box>
      )}
    </Box>
  );
};
export default ConversationsSidebar;
