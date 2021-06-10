import { Backdrop, CircularProgress, Grid } from "@material-ui/core";
import React from "react";

function FallbackLoading() {
  return (
    <Backdrop style={{ background: "#BDF5F2" }} open>
      <Grid>
        <CircularProgress
          size="3rem"
          variant="indeterminate"
          style={{ color: "white" }}
        />
      </Grid>
    </Backdrop>
  );
}

export default FallbackLoading;
