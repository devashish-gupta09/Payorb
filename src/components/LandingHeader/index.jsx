import {
  AppBar,
  Button,
  Drawer,
  Grid,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Close, Menu } from "@material-ui/icons";
import Link from "next/link";
import React from "react";

import Logo from "../Logo";
import { styles } from "./styles";

function LandingHeader() {
  const classes = styles();
  const [appMenu, setAppMenu] = React.useState(false);

  const toggleDrawer = () => {
    setAppMenu(!appMenu);
  };

  return (
    <AppBar className={classes.root} position={"static"}>
      <Drawer anchor={"left"} open={appMenu} onClose={toggleDrawer}>
        <Grid className={classes.drawerItemContainer}>
          <Grid
            container
            justify={"space-between"}
            className={classes.drawerTitleContainer}
          >
            <Logo redirectToHome={true} dark={true} width={"35%"} />
            <Typography className={classes.drawerClose} onClick={toggleDrawer}>
              <Close />
            </Typography>
          </Grid>

          <Grid className={classes.drawerList}>
            <li>About Us</li>

            {/* <Link href={PAGE_PATHS.CUSTOMER_EVENTS}>
              <li>Events</li>
            </Link> */}

            <Link href="/signin">
              <li>Sign In</li>
            </Link>
            <Link href="/signup">
              <li>Sign Up for Vendor</li>
            </Link>
          </Grid>
        </Grid>
      </Drawer>

      <Toolbar>
        <Grid container justify="space-between" alignItems="center">
          {/* Will be replaced with logo */}
          <Logo
            redirectToHome={true}
            dark={true}
            className={classes.logo}
          ></Logo>

          <Grid
            className={classes.buttonContainer}
            container
            justify="space-evenly"
          >
            {/* <Button className={classes.buttonSpacing}>Events</Button> */}
            <Button className={classes.buttonSpacing}>About Us</Button>
            {/* <Link href={PAGE_PATHS.CUSTOMER_EVENTS}>
              <Button className={classes.buttonSpacing}>Events</Button>
            </Link> */}
            <Link href="/signin">
              <Button className={classes.buttonSpacing}>Sign In</Button>
            </Link>

            <Link href="/signup">
              <Button className={classes.signupButton}>
                Sign up for Vendor
              </Button>
            </Link>
          </Grid>
          <Grid className={classes.menuButtonContainer}>
            <Menu style={{ color: "black" }} onClick={toggleDrawer} />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default LandingHeader;
