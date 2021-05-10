import {
  AppBar,
  Button,
  Drawer,
  Grid,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { styles } from "./styles";
import Link from "next/link";
import { Close } from "@material-ui/icons";
import Logo from "../Logo";
import { PAGE_PATHS } from "../../constants/paths";

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
            <Logo dark={true} width={"35%"} />
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
          <Grid>
            {/* Will be replaced with logo */}
            <Logo dark={true} width={"70%"}></Logo>
          </Grid>

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
          <Grid
            className={classes.menuButtonContainer}
            container
            justify="space-evenly"
          >
            <img src={"../assets/menu.png"} onClick={toggleDrawer} />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default LandingHeader;
