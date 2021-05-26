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
import { useRouter } from "next/router";
import React from "react";

import { PAGE_PATHS } from "../../constants/paths";

import { FirebaseAuth } from "../AuthenticationContext";

import Logo from "../Logo";
import ProfileSectionHeader from "../ProfileSectionHeader";
import { styles } from "./styles";

function LandingHeader() {
  const classes = styles();
  const [appMenu, setAppMenu] = React.useState(false);
  const router = useRouter();

  const toggleDrawer = () => {
    setAppMenu(!appMenu);
  };

  const auth = FirebaseAuth.Singleton();

  const handleProfileClick = () => {
    router.push(PAGE_PATHS.VENDOR_DASHBOARD_PROFILE);
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
            <Logo redirectToHome={true} dark={true} width={"5em"} />
            <Typography className={classes.drawerClose} onClick={toggleDrawer}>
              <Close />
            </Typography>
          </Grid>

          <Grid className={classes.drawerList}>
            <Link href={PAGE_PATHS.ABOUT}>
              <li>About Us</li>
            </Link>

            {/* <Link href={PAGE_PATHS.CUSTOMER_EVENTS}>
              <li>Events</li>
            </Link> */}

            {auth.getUser() ? (
              <Link href={PAGE_PATHS.VENDOR_DASHBOARD_PROFILE}>
                <li>Profile</li>
              </Link>
            ) : (
              <>
                <Link href="/signin">
                  <li>Sign In</li>
                </Link>
                <Link href="/signup">
                  <li>Sign Up for Vendor</li>
                </Link>
              </>
            )}
          </Grid>
        </Grid>
      </Drawer>

      <Toolbar>
        <Grid container justify="space-between" alignItems="center">
          {/* Will be replaced with logo */}
          <Logo
            redirectToHome={true}
            dark={true}
            width={"4.5em"}
            // className={classes.logo}
          ></Logo>

          <Grid
            className={classes.buttonContainer}
            container
            justify="space-evenly"
          >
            {/* <Button className={classes.buttonSpacing}>Events</Button> */}
            <Link href={PAGE_PATHS.ABOUT}>
              <Button className={classes.buttonSpacing}>About Us</Button>
            </Link>
            {/* <Link href={PAGE_PATHS.CUSTOMER_EVENTS}>
              <Button className={classes.buttonSpacing}>Events</Button>
            </Link> */}

            {auth.getUser() ? (
              <Grid
                style={{
                  cursor: "pointer",
                  border: "1px solid",
                  borderRadius: "5px",
                  "&:hover": {
                    backgroundColor: "grey",
                  },
                }}
                onClick={handleProfileClick}
              >
                <ProfileSectionHeader
                  image={auth.getUser().photoURL}
                  name={auth.getUser().displayName}
                />
              </Grid>
            ) : (
              <>
                <Link href="/signin">
                  <Button className={classes.buttonSpacing}>Sign In</Button>
                </Link>

                <Link href="/signup">
                  <Button className={classes.signupButton}>
                    Sign up for Vendor
                  </Button>
                </Link>
              </>
            )}
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
