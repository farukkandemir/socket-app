import React from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { v4 as uuid } from "uuid";

const Login = ({ onIdSubmit }) => {
  const createNewId = () => onIdSubmit(uuid());

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
      }}
    >
      <Grid container direction="column" rowGap={2}>
        <Grid item>
          <Typography variant="h6">Welcome To The Chat App</Typography>
        </Grid>
        <Grid item>
          <TextField
            label="Enter Your Id"
            size="small"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item container columnGap={2}>
          <Grid item>
            <Button variant="contained" color="primary" size="small">
              Login
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={createNewId}
            >
              Create A New Id
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
