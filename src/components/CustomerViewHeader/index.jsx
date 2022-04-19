import { Button, Drawer, Grid, Toolbar, Typography } from "@material-ui/core";
import { Close, Menu } from "@material-ui/icons";
import Link from "next/link";
import React from "react";

import CustomHeader from "../Header";

import Logo from "../Logo";
import { styles } from "./styles";

function CustomerViewHeader() {
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
            <Logo dark={true} redirectToHome={true} />
            <Typography className={classes.drawerClose} onClick={toggleDrawer}>
              <Close />
            </Typography>
          </Grid>

          <Grid className={classes.drawerList}>
            <Link href="/">
              <li>Home</li>
            </Link>
            <Link href="/signup">
              <li>Sign Up as Vendor</li>
            </Link>
          </Grid>
        </Grid>
      </Drawer>

      <Toolbar>
        <Grid container justify="space-between" alignItems="center">
          <Logo dark={true} width="5em" redirectToHome={true} />

          <Grid
            className={classes.buttonContainer}
            container
            justify="space-evenly"
          >
            <Link href="/signup">
              <Button className={classes.signupButton}>
                Sign up as Vendor
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
    </CustomHeader>
  );
}

export default CustomerViewHeader;
