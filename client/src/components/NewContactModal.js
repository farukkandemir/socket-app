import React, { useState } from "react";
import ModalLayout from "./ModalLayout";
import { Button, Grid, TextField } from "@mui/material";
import { useContacts } from "../context/ContactsProvider";

const NewContactModal = ({ isAddContactOpen, setIsAddContactOpen }) => {
  const [contactId, setContactId] = useState("");
  const [contactName, setContactName] = useState("");

  const { createContact } = useContacts();

  const contactTextFields = [
    {
      label: "Contact Id",
      variant: "outlined",
      fullWidth: true,
      size: "small",
      value: contactId,
      setter: setContactId,
    },
    {
      label: "Contact Name",
      variant: "outlined",
      fullWidth: true,
      size: "small",
      value: contactName,
      setter: setContactName,
    },
  ];

  return (
    <ModalLayout
      open={isAddContactOpen}
      onClose={() => setIsAddContactOpen(false)}
      title={"Add Contact"}
    >
      <Grid container direction="column" rowGap={2}>
        {contactTextFields.map(({ value, setter, ...textField }, index) => (
          <Grid item key={index}>
            <TextField
              {...textField}
              value={value}
              onChange={(e) => setter(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#E0E3E7",
                  },
                  "&:hover fieldset": {
                    borderColor: "#E0E3E7",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#E0E3E7",
                  },
                },
              }}
            />
          </Grid>
        ))}
        <Grid item>
          <Button
            variant="contained"
            size="small"
            fullWidth
            disabled={!contactId || !contactName}
            onClick={() => {
              createContact({ id: contactId, name: contactName });
              setIsAddContactOpen(false);
            }}
          >
            Add Contact
          </Button>
        </Grid>
      </Grid>
    </ModalLayout>
  );
};

export default NewContactModal;
