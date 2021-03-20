import { AppBar, Button, Grid, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { styles } from "./styles";
import Link from "next/link";

function LandingHeader() {
  const classes = styles();

  return (
    <AppBar className={classes.root} position={"static"}>
      <Toolbar>
        <Grid container justify="space-between" alignItems="center">
          <Grid>
            {/* Will be replaced with logo */}
            <Typography style={{ color: "black", width: "fit-content" }}>
              Payorb
            </Typography>
          </Grid>

          <Grid
            className={classes.buttonContainer}
            container
            justify="space-evenly"
          >
            <Button className={classes.buttonSpacing}>Events</Button>
            <Button className={classes.buttonSpacing}>About Us</Button>
            <Link href="/signup">
              <Button className={classes.buttonSpacing}>Sign In</Button>
            </Link>

            <Button className={classes.signupButton}>Sign up for Vendor</Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default LandingHeader;
