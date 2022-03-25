import { Grid, Typography, Button } from "@material-ui/core";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import React from "react";

import { PAGE_PATHS } from "../../constants/paths";
import FeatureBookingSection from "../FeatureBookingSection";
import Logo from "../Logo";

import { styles } from "./styles";

const handleClick = () => {
  window[`scrollTo`]({ top: 0, behavior: "smooth" });
};

function Footer() {
  const classes = styles();
  const [readMore, setReadMore] = React.useState(false);

  const handleReadMore = () => {
    setReadMore(!readMore);
  };

  return (
    <Grid container className={classes.container}>
      <FeatureBookingSection />
      <Grid item sm={3} className={classes.logoContainer}>
        <Logo width="8em" />
      </Grid>
      <Grid item sm={3} className={classes.companyContainer}>
        <Typography
          className={classes.companySectionTitle}
          variant={"h6"}
          gutterBottom
        >
          Links
        </Typography>
        <Grid className={classes.companyTabs}>
          <Typography>
            <p className={classes.hover}>
              <a href="/about">About Us</a>
            </p>
            <p className={classes.hover}>
              <a href="/features">Features</a>
            </p>
            <p className={classes.hover}>
              <a href="/features">Become a solopreneur</a>
            </p>
            <p className={classes.hover}>
              <a href="/features">Blogs</a>
            </p>
          </Typography>
        </Grid>
      </Grid>
      <Grid item sm={3}>
        <Typography
          className={classes.companySectionTitle}
          variant={"h6"}
          gutterBottom
        >
          Company
        </Typography>
        <Grid className={classes.companyTabs}>
          <Typography>
            <p className={classes.hover}>
              <a href={PAGE_PATHS.POLICY_TERMS_AND_CONDS}>Terms & Conditions</a>
            </p>
            <p className={classes.hover}>
              <a href={PAGE_PATHS.POLICY_PRIVACY}>Privacy Policy</a>
            </p>
            <p className={classes.hover}>
              <a href="/features">Contact</a>
            </p>
          </Typography>
        </Grid>
      </Grid>
      <Grid item sm={3}>
        <Typography
          className={classes.companySectionTitle}
          variant={"h6"}
          gutterBottom
        >
          Get in Touch
        </Typography>
        <Grid className={classes.companyTabs}>
          <Typography className={classes.getInTouchMobile}>
            <p>
              Vanickel Labs, 2nd Floor, <br />
              Aparna Towers, Kondapur, <br />
              Hyderabad - 500084
            </p>
          </Typography>
          <Typography className={classes.mobile}>info@payorb.com</Typography>
        </Grid>
      </Grid>

      <Button className={classes.scroll} onClick={handleClick}>
        <Grid className={classes.scrollIcon}>
          <ArrowDropUpIcon />
        </Grid>
      </Button>

      <Grid item sm={12}>
        <Typography className={classes.bottomLabel}>
          Ⓒ <b>2021</b> PayOrb. All rights reserved
        </Typography>
        <Typography className={classes.bottomLabelMobile}>
          info@payorb.com
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Footer;
