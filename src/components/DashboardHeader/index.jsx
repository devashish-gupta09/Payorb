import { AppBar, Drawer, Grid, Link, Toolbar, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React from "react";
import { PAGE_PATHS } from "../../constants/paths";
import Logo from "../Logo";
import ProfileSectionHeader from "../ProfileSectionHeader";
import TabBarHeader from "../TabBarHeader";
import { styles } from "./styles";

function VendorDashboardHeader({ profileData }) {
  const classes = styles();
  const [appMenu, setAppMenu] = React.useState(false);

  const toggleDrawer = () => {
    setAppMenu(!appMenu);
  };

  return (
    <AppBar className={classes.root} position={"static"}>
      <Drawer anchor="left" open={appMenu} onClose={toggleDrawer}>
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
      </Drawer>
      <Toolbar>
        <Grid container alignItems="center">
          {/* For Mobile Screens */}
          <Grid container justify="space-between" className={classes.mobile}>
            <Grid item>
              <Logo dark={true} width={"50%"}></Logo>
            </Grid>
            <Grid className={classes.menuButtonContainer}>
              <img src={"../assets/menu.png"} onClick={toggleDrawer} />
            </Grid>
          </Grid>

          {/* For Desktop and wide screens */}

          <Grid container alignItems="center" className={classes.wideScreen}>
            <Grid item sm={2}>
              <Logo dark={true} width={"35%"}></Logo>
            </Grid>
            <Grid container item sm={8}></Grid>
            <Grid item sm={2}>
              <Link
                href={`${PAGE_PATHS.VENDOR_DASHBOARD_PROFILE}`}
              >
                <ProfileSectionHeader
                  image={profileData.profileImgUrl}
                  name={profileData.name}
                />
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default VendorDashboardHeader;
