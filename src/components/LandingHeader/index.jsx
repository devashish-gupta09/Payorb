import { Button, Drawer, Grid, Toolbar, Typography } from "@material-ui/core";
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
    <CustomHeader>
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
<<<<<<< HEAD
            <li
              onClick={() => {
                handleClick(PAGE_PATHS.HOME);
              }}
            >
              Home
            </li>
            <li
              onClick={() => {
                handleClick(PAGE_PATHS.FEATURES);
              }}
            >
              Features
            </li>
            <li
              onClick={() => {
                handleClick(PAGE_PATHS.ABOUT);
              }}
            >
              About Us
            </li>
            <li
              onClick={() => {
                handleClick(PAGE_PATHS.SOLOPRENEUR);
              }}
            >
              Become a Solopreneur
            </li>
=======
            {router.pathname === PAGE_PATHS.HOME ? (
              <li
                onClick={() => {
                  handleClick(PAGE_PATHS.HOME);
                }}
                className={classes.buttonActive}
              >
                Home
              </li>
            ) : (
              <li
                onClick={() => {
                  handleClick(PAGE_PATHS.HOME);
                }}
              >
                Home
              </li>
            )}
            {router.pathname === PAGE_PATHS.FEATURES ? (
              <li
                onClick={() => {
                  handleClick(PAGE_PATHS.FEATURES);
                }}
                className={classes.buttonActive}
              >
                Features
              </li>
            ) : (
              <li
                onClick={() => {
                  handleClick(PAGE_PATHS.FEATURES);
                }}
              >
                Features
              </li>
            )}
            {router.pathname === PAGE_PATHS.ABOUT ? (
              <li
                onClick={() => {
                  handleClick(PAGE_PATHS.ABOUT);
                }}
                className={classes.buttonActive}
              >
                About Us
              </li>
            ) : (
              <li
                onClick={() => {
                  handleClick(PAGE_PATHS.ABOUT);
                }}
              >
                About Us
              </li>
            )}
            {router.pathname === PAGE_PATHS.SOLOPRENEUR ? (
              <li
                onClick={() => {
                  handleClick(PAGE_PATHS.SOLOPRENEUR);
                }}
                className={classes.buttonActive}
              >
                Become a Solopreneur
              </li>
            ) : (
              <li
                onClick={() => {
                  handleClick(PAGE_PATHS.SOLOPRENEUR);
                }}
              >
                Become a Solopreneur
              </li>
            )}
>>>>>>> 19836e2f7b22c2a03f16a91efd6b70d6d891fc28

            <LandingHeaderProfile handleLinkClick={handleClick} />
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
<<<<<<< HEAD
              <Button
                onClick={() =>
                  event({
                    action: HOME_CLICK,
                  })
                }
                className={classes.buttonSpacing}
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
                className={classes.buttonSpacing}
              >
                Features
              </Button>
=======
              {router.pathname === PAGE_PATHS.HOME ? (
                <Button
                  onClick={() =>
                    event({
                      action: HOME_CLICK,
                    })
                  }
                  className={classes.buttonActive}
                >
                  Home
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    event({
                      action: HOME_CLICK,
                    })
                  }
                  className={classes.buttonSpacing}
                >
                  Home
                </Button>
              )}
            </Link>
            <Link href={PAGE_PATHS.FEATURES}>
              {router.pathname === PAGE_PATHS.FEATURES ? (
                <Button
                  onClick={() =>
                    event({
                      action: FEATURES_CLICK,
                    })
                  }
                  className={classes.buttonActive}
                >
                  Features
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    event({
                      action: FEATURES_CLICK,
                    })
                  }
                  className={classes.buttonSpacing}
                >
                  Features
                </Button>
              )}
>>>>>>> 19836e2f7b22c2a03f16a91efd6b70d6d891fc28
            </Link>
            <Link href={PAGE_PATHS.ABOUT}>
              {router.pathname === PAGE_PATHS.ABOUT ? (
                <Button
                  onClick={() =>
                    event({
                      action: ABOUT_CLICK,
                    })
                  }
                  className={classes.buttonActive}
                >
                  About Us
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    event({
                      action: ABOUT_CLICK,
                    })
                  }
                  className={classes.buttonSpacing}
                >
                  About Us
                </Button>
              )}
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
            <Link href={PAGE_PATHS.ABOUT}>
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
            </Link>

            <LandingHeaderProfile />
          </Grid>
          <Grid className={classes.menuButtonContainer}>
            <Menu style={{ color: "black" }} onClick={toggleDrawer} />
          </Grid>
        </Grid>
      </Toolbar>
    </CustomHeader>
  );
}

export default LandingHeader;