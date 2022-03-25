import { Button, Drawer, Grid, Toolbar } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { PAGE_PATHS } from "../../constants/paths";
import {
  HOME_CLICK,
  ABOUT_CLICK,
  FEATURES_CLICK,
  SOLOPRENEUR_CLICK,
  event,
} from "../../utils/ga";

import CustomHeader from "../Header";

import Logo from "../Logo";
import SignUpHeaderProfile from "../SignUpHeaderProfile";
import { styles } from "./styles";

function SignupHeader() {
  const classes = styles();
  const router = useRouter();
  const [appMenu, setAppMenu] = React.useState(false);

  const toggleDrawer = () => {
    setAppMenu(!appMenu);
  };

  const handleClick = (href) => {
    toggleDrawer();
    router.push(href);
  };

  return (
    <CustomHeader>
      <Drawer anchor={"left"} open={appMenu} onClose={toggleDrawer}>
        <Grid className={classes.drawerItemContainer}>
          <Grid className={classes.drawerList}>
            <li
              onClick={() => {
                handleClick(PAGE_PATHS.HOME);
              }}
              className={
                router.pathname === PAGE_PATHS.HOME
                  ? classes.buttonActive
                  : classes.buttonSpacing
              }
            >
              Home
            </li>
            <li
              onClick={() => {
                handleClick(PAGE_PATHS.FEATURES);
              }}
              className={
                router.pathname === PAGE_PATHS.FEATURES
                  ? classes.buttonActive
                  : classes.buttonSpacing
              }
            >
              Features
            </li>
            <li
              onClick={() => {
                handleClick(PAGE_PATHS.ABOUT);
              }}
              className={
                router.pathname === PAGE_PATHS.ABOUT
                  ? classes.buttonActive
                  : classes.buttonSpacing
              }
            >
              About Us
            </li>
            <li
              onClick={() => {
                handleClick(PAGE_PATHS.SOLOPRENEUR);
              }}
              className={
                router.pathname === PAGE_PATHS.SOLOPRENEUR
                  ? classes.buttonActive
                  : classes.buttonSpacing
              }
            >
              Become a Solopreneur
            </li>

            <SignUpHeaderProfile handleLinkClick={handleClick} />
          </Grid>
        </Grid>
      </Drawer>

      <Toolbar>
        <Grid container justify="space-between" alignItems="center">
          {/* Will be replaced with logo */}
          <Logo redirectToHome={true} dark={true} width={"6em"}></Logo>

          <Grid
            className={classes.buttonContainer}
            container
            justify="space-evenly"
          >
            <Link href={PAGE_PATHS.HOME}>
              <Button
                onClick={() =>
                  event({
                    action: HOME_CLICK,
                  })
                }
                className={
                  router.pathname === PAGE_PATHS.HOME
                    ? classes.buttonActive
                    : classes.buttonSpacing
                }
              >
                Home
              </Button>
            </Link>
            <Link href={PAGE_PATHS.FEATURES}>
              <Button
                onClick={() =>
                  event({
                    action: FEATURES_CLICK,
                  })
                }
                className={
                  router.pathname === PAGE_PATHS.FEATURES
                    ? classes.buttonActive
                    : classes.buttonSpacing
                }
              >
                Features
              </Button>
            </Link>
            <Link href={PAGE_PATHS.ABOUT}>
              <Button
                onClick={() =>
                  event({
                    action: ABOUT_CLICK,
                  })
                }
                className={
                  router.pathname === PAGE_PATHS.ABOUT
                    ? classes.buttonActive
                    : classes.buttonSpacing
                }
              >
                About Us
              </Button>
            </Link>
            <Link href={PAGE_PATHS.SOLOPRENEUR}>
              {router.pathname === PAGE_PATHS.SOLOPRENEUR ? (
                <Button
                  onClick={() =>
                    event({
                      action: SOLOPRENEUR_CLICK,
                    })
                  }
                  className={classes.buttonActive}
                >
                  Become a Solopreneur
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    event({
                      action: SOLOPRENEUR_CLICK,
                    })
                  }
                  className={classes.buttonSpacing}
                >
                  Become a Solopreneur
                </Button>
              )}
            </Link>

            <SignUpHeaderProfile />
          </Grid>
          <Grid className={classes.menuButtonContainer}>
            <Menu style={{ color: "black" }} onClick={toggleDrawer} />
          </Grid>
        </Grid>
      </Toolbar>
    </CustomHeader>
  );
}

export default SignupHeader;
