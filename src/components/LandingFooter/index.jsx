import { Grid, Link, Typography, Button } from "@material-ui/core";
import React from "react";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { PAGE_PATHS } from "../../constants/paths";
import Logo from "../Logo";

import { styles } from "./styles";
import FeatureBookingSection from "../FeatureBookingSection";

const handleClick = () => {
  window[`scrollTo`]({ top: 0, behavior: "smooth" });
}

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
            <p className={classes.hover}><a href="/about">About Us</a></p>
            <p className={classes.hover}><a href="/features">Features</a></p>
            <p className={classes.hover}><a href="/features">Become a solopreneur</a></p>
            <p className={classes.hover}><a href="/features">Blogs</a></p>
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
            <p className={classes.hover}><a href={PAGE_PATHS.POLICY_TERMS_AND_CONDS}>Terms & Conditions</a></p>
            <p className={classes.hover}><a href={PAGE_PATHS.POLICY_PRIVACY}>Privacy Policy</a></p>
            <p className={classes.hover}><a href="/features">Contact</a></p>
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
            <p>Vanickel Labs, 2nd Floor,
              Aparna Towers, Kondapur,
              Hyderabad - 500084</p>
          </Typography>
          <Typography className={classes.mobile}>
            info@payorb.com
          </Typography>
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

/*const webDisclaimer = `The information contained in this website is for general information purposes only. The information is provided by www.payorb.in and while we endeavour to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk. 
In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website. 
Through this website you are able to contact other vendors and/or freelancers which are not under the control of PayOrb. We have no control over the nature, content and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them. 
All opinion's expressed in the reviews section are of verified End Users and PayOrb cannot be held liable for any opinions or views expressed therein.
Every effort is made to keep the website up and running smoothly. However, PayOrb takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond its control. 
`;*/

export default Footer;
