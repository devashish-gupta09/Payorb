import { AppBar, Button, Grid, Toolbar } from "@material-ui/core";
import { HomeRounded } from "@material-ui/icons";
import Link from "next/link";
import React from "react";

import Logo from "../Logo";
import { styles } from "./styles";

function SigningHeader() {
  const classes = styles();

  return (
    <AppBar className={classes.root} position={"static"}>
      <Toolbar>
        <Grid container justify="space-between" alignItems="center">
          <Grid>
            {/* Will be replaced with logo */}
            <Logo dark={true} width={"4.5em"}></Logo>
          </Grid>
          <Grid className={classes.backButtonContainer}>
            <Link href="/">
              <Button variant="outlined" className={classes.backButton}>
                Back to Home
              </Button>
            </Link>
            <Link href="/">
              <HomeRounded className={classes.backLogo} />
            </Link>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default SigningHeader;
