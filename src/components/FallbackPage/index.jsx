import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { appColors } from "../../../styles/colors";

const styles = makeStyles((theme) => ({
  root: {
    height: "60vh",
    width: "80%",
    display: "flex",
    flexDirection: "row",
    justifyItems: "center",
    alignItems: "center",
    color: appColors.grey,
  },
}));

function FallbackPage({ title, subtitle }) {
  const classes = styles();
  return (
    <Grid className={classes.root}>
      <Grid>
        <Typography variant={"h3"}>{title}</Typography>
        <Typography variant={"h6"}>{subtitle}</Typography>
      </Grid>
    </Grid>
  );
}

export default FallbackPage;
