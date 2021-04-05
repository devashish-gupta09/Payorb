import { AppBar, Drawer, Grid, Toolbar, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React from "react";
import Logo from "../Logo";
import ProfileSectionHeader from "../ProfileSectionHeader";
import TabBarHeader from "../TabBarHeader";
import { styles } from "./styles";

function VendorDashboardHeader() {
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
              <ProfileSectionHeader
                image="https://www.google.com/imgres?imgurl=https%3A%2F%2Fmaterial-ui.com%2Fstatic%2Fimages%2Favatar%2F1.jpg&imgrefurl=https%3A%2F%2Fmaterial-ui.com%2Fcomponents%2Favatars%2F&tbnid=AyLA-QjKOR7zDM&vet=12ahUKEwiMvvHPg9fvAhWK7TgGHeFRA28QMygAegUIARClAQ..i&docid=lwWju4eQyAN6LM&w=128&h=128&q=avatar%20material%20ui&ved=2ahUKEwiMvvHPg9fvAhWK7TgGHeFRA28QMygAegUIARClAQ"
                name="Alfredo Culhane"
              />
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default VendorDashboardHeader;
