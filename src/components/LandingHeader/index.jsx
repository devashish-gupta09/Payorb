import { Button, Drawer, Grid, Toolbar, Typography } from "@material-ui/core";
import { Close, Menu } from "@material-ui/icons";
import Link from "next/link";
import React from "react";

import { PAGE_PATHS } from "../../constants/paths";

import CustomHeader from "../Header";
import LandingHeaderProfile from "../LandingHeaderProfile";

import Logo from "../Logo";
import { styles } from "./styles";

function LandingHeader() {
  const classes = styles();
  const [appMenu, setAppMenu] = React.useState(false);

  const toggleDrawer = () => {
    setAppMenu(!appMenu);
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
            <Link href={PAGE_PATHS.ABOUT}>
              <li>About Us</li>
            </Link>


            <LandingHeaderProfile />
          </Grid>
        </Grid>
      </Drawer>

      <Toolbar>
        <Grid container justify="space-between" alignItems="center">
          {/* Will be replaced with logo */}
          <Logo redirectToHome={true} dark={true} width={"4.5em"}></Logo>

          <Grid
            className={classes.buttonContainer}
            container
            justify="space-evenly"
          >
            <Link href={PAGE_PATHS.ABOUT}>
              <Button className={classes.buttonSpacing}>About Us</Button>
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
