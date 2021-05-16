import {
  AppBar,
  Button,
  Drawer,
  Grid,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Close, Home, Menu } from "@material-ui/icons";
import Link from "next/link";
import React from "react";

import Logo from "../Logo";
import { styles } from "./styles";

function CustomerViewHeader() {
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
            <Logo dark={true} />
            <Typography className={classes.drawerClose} onClick={toggleDrawer}>
              <Close />
            </Typography>
          </Grid>

          <Grid className={classes.drawerList}>
            <Link href="/">
              <li>Home</li>
            </Link>
            <Link href="/signup">
              <li>Sign Up for Vendor</li>
            </Link>
          </Grid>
        </Grid>
      </Drawer>

      <Toolbar>
        <Grid container justify="space-between" alignItems="center">
          <Logo dark={true} width="5em" />

          <Grid
            className={classes.buttonContainer}
            container
            justify="space-evenly"
          >
            <Link href="/">
              <Button>
                <Home />
              </Button>
            </Link>
            <Link href="/signup">
              <Button className={classes.signupButton}>
                Sign up for Vendor
              </Button>
            </Link>
          </Grid>
          <Grid
            className={classes.menuButtonContainer}
            container
            justify="space-evenly"
          >
            <Menu style={{ color: "black" }} onClick={toggleDrawer} />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default CustomerViewHeader;
