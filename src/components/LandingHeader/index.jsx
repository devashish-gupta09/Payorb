import { Button, Drawer, Grid, Toolbar, Typography,Icon } from "@material-ui/core";
import { Close, Menu } from "@material-ui/icons";
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
import LandingHeaderProfile from "../LandingHeaderProfile";

import Logo from "../Logo";
import { styles } from "./styles";

function LandingHeader() {
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
    <CustomHeader >
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

            <LandingHeaderProfile handleLinkClick={handleClick} />
          </Grid>
        </Grid>
      </Drawer>

      <Toolbar>

          <Grid className={classes.menuButtonContainer}>
                  <Icon classeName={classes.iconRoot}>
                  <img className={classes.imageIcon} src="/assets/menuBar.svg" onClick={toggleDrawer}/>
                  </Icon>
                  <Logo redirectToHome={true} dark={true} width={"6em"}></Logo>
          </Grid>
        <Grid container sm={12} justify="space-between" alignItems="center">
          {/* Will be replaced with logo */}
          
          <Grid className={classes.desktop}>
          <Logo redirectToHome={true} dark={true} width={"6em"}></Logo>
          </Grid>

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

            <LandingHeaderProfile />
          </Grid>
          
        </Grid>
      </Toolbar>
    </CustomHeader>
  );
}

export default LandingHeader;
