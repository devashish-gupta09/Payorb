import { Grid, Button,Typography } from "@material-ui/core";
import CallMadeIcon from "@material-ui/icons/CallMade";
import React from "react";
import Link from "next/link";
import { PAGE_PATHS } from "../../constants/paths";
import { event, SIGNUP_CLICK } from "../../utils/ga";

import ButtonCapsule from "../ButtonCapsule";
import { styles } from "./styles";

function FeatureBookingSection({ content }) {
  const classes = styles();

  return (
    <Grid className={classes.container}>
      <Typography  variant="h4" className={classes.title}>
        {content.title}
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
