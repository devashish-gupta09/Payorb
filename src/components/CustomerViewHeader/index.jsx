import {
  Box,
  Button,
  Drawer,
  Grid,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import Link from "next/link";
import React from "react";

import CustomHeader from "../Header";

import Logo from "../Logo";
import { styles } from "./styles";

function CustomerViewHeader() {
  const classes = styles();
  const [appMenu, setAppMenu] = React.useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleDrawer = () => {
    setAppMenu(!appMenu);
  };

  return (
    <Box sx={{ display: "flex", marginBottom: isMobile ? "5em" : 0 }}>
      <CustomHeader>
        <Drawer anchor={"left"} open={appMenu} onClose={toggleDrawer}>
          <Grid className={classes.drawerItemContainer}>
            {/* <Grid
            container
            justify={"space-between"}
            className={classes.drawerTitleContainer}
          >
            <Logo dark={true} redirectToHome={true} />
            <Typography className={classes.drawerClose} onClick={toggleDrawer}>
              <Close />
            </Typography>
          </Grid> */}

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
    </Box>
  );
}

export default CustomerViewHeader;
