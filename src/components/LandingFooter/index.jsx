import { Grid, Link, Typography } from "@material-ui/core";
import React from "react";

import { PAGE_PATHS } from "../../constants/paths";
import Logo from "../Logo";

import { styles } from "./styles";

function Footer() {
  const classes = styles();
  const [readMore, setReadMore] = React.useState(false);

  const handleReadMore = () => {
    setReadMore(!readMore);
  };
  return (
    <Grid className={classes.container}>
      <Grid container>
        <Grid item sm={4} className={classes.logoContainer}>
          <Logo width="6em" />
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
            <Typography><a href="/"></a>About Us</Typography>
          </Grid>
        </Grid>
        <Grid item sm={4}>
          <Typography
            className={classes.companySectionTitle}
            variant={"h6"}
            gutterBottom
          >
            Social Media
          </Typography>
          <Grid className={classes.socialLinksContainer} container>
            <img src="/assets/facebook.png"></img>
            <img src="/assets/linkedin.png"></img>
            <img src="/assets/instagram.png"></img>
            <img src="/assets/twitter.png"></img>
          </Grid>
        </Grid>
        <Grid item sm={12}>
          <Typography className={classes.bottomLabel}>
            @ 2021 All Rights Reserved. Powered by Vanickel Labs |{" "}
            <Link
              className={classes.policyLink}
              href={PAGE_PATHS.POLICY_TERMS_AND_CONDS}
            >
              Terms and Conditions
            </Link>{" "}
            |{" "}
            <Link
              className={classes.policyLink}
              href={PAGE_PATHS.POLICY_PRIVACY}
            >
              Privacy Policy
            </Link>
          </Typography>
        </Grid>
        <Grid item sm={12}>
          <Typography className={classes.disclaimer}>
            Disclaimer :{" "}
            {webDisclaimer.substr(0, readMore ? webDisclaimer.length - 1 : 562)}
            <span onClick={handleReadMore} className={classes.readMore}>
              {readMore ? "Show Less" : "Show More"}
            </span>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

const webDisclaimer = `The information contained in this website is for general information purposes only. The information is provided by www.payorb.in and while we endeavour to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk. 
In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website. 
Through this website you are able to contact other vendors and/or freelancers which are not under the control of PayOrb. We have no control over the nature, content and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them. 
All opinion's expressed in the reviews section are of verified End Users and PayOrb cannot be held liable for any opinions or views expressed therein.
Every effort is made to keep the website up and running smoothly. However, PayOrb takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond its control. 
`;

export default Footer;
