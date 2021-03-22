import { Grid, Typography } from "@material-ui/core";
import React from "react";
import Logo from "../Logo";
import { styles } from "./styles";

function Footer() {
  const classes = styles();
  return (
    <Grid className={classes.container}>
      <Grid container>
        <Grid item sm={4}>
          <Logo />
          <Typography
            variant={"h6"}
            style={{ padding: "1em 0", color: "white" }}
          >
            Office Address
          </Typography>
          <Typography
            style={{ color: "white", letterSpacing: "1px", fontSize: "0.8em" }}
          >
            90 Fifth Avenue, 3rd Floor
            <br />
            New York NY 10011 <br />
            212.913.9058
          </Typography>
        </Grid>
        <Grid item sm={4}>
          <Typography
            className={classes.companySectionTitle}
            variant={"h6"}
            gutterBottom
          >
            Company
          </Typography>
          <Grid className={classes.companyTabs}>
            <Typography>Events</Typography>
            <Typography>Partner</Typography>
            <Typography>Team</Typography>
            <Typography>Contact Us</Typography>
          </Grid>
        </Grid>
        <Grid item sm={4}>
          <Typography
            className={classes.companySectionTitle}
            variant={"h6"}
            gutterBottom
          >
            Social Links
          </Typography>
          <Grid className={classes.companyTabs}>
            <Typography>Events</Typography>
            <Typography>Partner</Typography>
            <Typography>Team</Typography>
            <Typography>Contact Us</Typography>
          </Grid>
        </Grid>
        <Grid item sm={12}>
          <Typography
            align="center"
            style={{
              paddingTop: "3em",
              opacity: "0.5",
              fontWeight: "500",
              fontSize: "0.8em",
              letterSpacing: "1px",
            }}
          >
            @ 2021 All Rights Reserved. Designed by payorb
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Footer;
