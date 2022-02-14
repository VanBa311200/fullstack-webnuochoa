import { Container, Grid } from "@mui/material";
import React from "react";
import Master1 from "../views/Master1";

const Payment = (props) => {
  return (
    <Master1 {...props}>
      <Container>
        <Grid contrainer spacing={2} minHeight="70vh">
          <Grid item md={8}></Grid>
          <Grid item md={4}></Grid>
        </Grid>
      </Container>
    </Master1>
  );
};

export default Payment;
