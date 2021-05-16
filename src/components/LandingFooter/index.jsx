import { Grid, Typography } from "@material-ui/core";
import React from "react";

import { styles } from "./styles";

function Footer() {
  const classes = styles();
  return (
    <Grid className={classes.container}>
      <Grid container>
        <Grid item sm={4}>
          <img src="../assets/logo.png" className={classes.logo} />
          <Grid className={classes.officeAddressContainer}>
            <Typography variant={"h6"} className={classes.officeAddress}>
              Office Address
            </Typography>
            <Typography
              style={{
                color: "white",
                letterSpacing: "1px",
                fontSize: "0.8em",
              }}
            >
              90 Fifth Avenue, 3rd Floor
              <br />
              New York NY 10011 <br />
              212.913.9058
            </Typography>
          </Grid>
        </Grid>
        <Grid item sm={4} className={classes.companyContainer}>
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
          <Grid className={classes.socialLinksContainer} container>
            <img src="../assets/facebook.png"></img>
            <img src="../assets/linkedin.png"></img>
            <img src="../assets/instagram.png"></img>
            <img src="../assets/twitter.png"></img>
          </Grid>
        </Grid>
        <Grid item sm={12}>
          <Typography align="center" className={classes.bottomLabel}>
            @ 2021 All Rights Reserved. Designed by payorb
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Footer;
