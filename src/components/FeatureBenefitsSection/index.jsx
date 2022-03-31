import { Grid, Typography } from "@material-ui/core";
import React from "react";

import { styles } from "./styles";

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: "black",
      backgroundColor: "black",
      height: "0.35vw",
      width: "15vw",
    }}
  />
);
function FeatureBenefitsSection({ content }) {
  const classes = styles();
  return (
    <Grid className={classes.container} container>
      <Grid
        item
        sm={4}
        className={classes.title}
        container
        alignItems="center"
        justifyContent="center"
      >
        <Grid className={classes.titleContainer}>
          <Typography className={classes.mainTitle}>{content.title}</Typography>
          {/* <Grid className={classes.coloredLine}></Grid> */}
          <p className={classes.descriptionSubTitle}>
            Take the smartest first step as a Solopreneur.
          </p>
        </Grid>
      </Grid>
      <Grid
        container
        item
        sm={8}
        className={classes.description}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Typography
          style={{
            fontSize: "0.85em",
            fontWeight: "500",
          }}
        >
          <p>
            <b>Simplicity is an underrated Superpower!</b>
          </p>
          <p>
            Taking your business online with PayOrb takes less than 5 minutes!
            Access all of your operations and essential tools on the go with our
            easy to use, mobile and desktop friendly platform.{" "}
          </p>
          <p>
            <b>
              Our Free Trial class feature is the ultimate growth hack for new
              businesses.
            </b>
          </p>
          <p>
            We understand that client acquisition can be a challenge for new
            solopreneurs. This power packed feature takes your business from 0
            to 1. Evolve your services as you grow.
          </p>
          <p>
            <b>Promote your services, with just one click.</b>
          </p>
          <p>
            Tired of spending hours reaching out to people over calls & messages
            to promote your services? Our promotional dashboard is just the
            timesaver you need. With Payorb, send out promote your services to
            hundreds of prospective clients, with just one click.{" "}
          </p>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default FeatureBenefitsSection;
