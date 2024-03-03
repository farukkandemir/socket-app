import { Box, Button, Divider, Grid, Modal, Typography } from "@mui/material";
import React from "react";

const ModalLayout = ({ children, open, onClose, title }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "secondary",
      }}
    >
      <Box
        sx={{
          width: 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Grid container direction="column" rowGap={2}>
          <Grid item>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography variant="h6">{title}</Typography>
              </Grid>
              <Grid item>
                <Button
                  onClick={onClose}
                  size="small"
                  variant="outlined"
                  color="error"
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Divider />
          <Grid item>{children}</Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ModalLayout;
