import { Grid, Button, Typography } from "@material-ui/core";
import CallMadeIcon from "@material-ui/icons/CallMade";
import React from "react";
import Link from "next/link";
import { event, SIGNUP_CLICK } from "../../utils/ga";
import { styles } from "./styles";
import Logo from "../Logo";
function FeatureBookingSection() {
  const classes = styles();

  return (
    <Grid className={classes.container}>
      <Grid className={classes.logoContainer}>
        <Logo width="7em" />
      </Grid>
      <Typography variant="h4" className={classes.title}>
        People who are ready to book events!
      </Typography>
      <Grid container justify={"center"} className={classes.bottomButton}>
        <Link href={"/signup"}>
          <Button
            className={classes.capsuleButton}
            onClick={() =>
              event({ action: SIGNUP_CLICK, params: { location: "header" } })}>
            Get Started
            <CallMadeIcon className={classes.callMadeIcon} />
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}

export default FeatureBookingSection;
