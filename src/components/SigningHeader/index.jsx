import { AppBar, Button, Drawer, Grid, Toolbar } from "@material-ui/core";
import React from "react";
import { styles } from "./styles";
import { HomeRounded } from "@material-ui/icons";
import Logo from "../Logo";
import Link from "next/link";

function SigningHeader() {
  const classes = styles();

  return (
    <AppBar className={classes.root} position={"static"}>
      <Toolbar>
        <Grid container justify="space-between" alignItems="center">
          <Grid>
            {/* Will be replaced with logo */}
            <Logo dark={true} width={"70%"}></Logo>
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
