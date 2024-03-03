import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useContacts } from "../context/ContactsProvider";
import { IoIosContact } from "react-icons/io";

const ContactsSidebar = () => {
  const { contacts } = useContacts();

  return (
    <Box>
      {!contacts.length ? (
        <Box
          sx={{
            pl: 2,
            py: 1,
            height: "100%",
          }}
        >
          <Typography variant="caption" fontStyle="italic" fontWeight="bold">
            No Contacts Yet
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            pl: 2,
            py: 1,
            height: "100%",
          }}
        >
          <Grid container direction="column" rowGap={2}>
            {contacts.map(({ id, name }) => (
              <Grid item key={id}>
                <Grid container alignItems={"center"} rowGap={1}>
                  <Grid item>
                    <IoIosContact
                      size={24}
                      style={{ color: "green", marginRight: "5px" }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">{name}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default ContactsSidebar;
