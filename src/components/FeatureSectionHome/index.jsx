import { Grid, Typography } from "@material-ui/core";
import CallMadeIcon from "@material-ui/icons/CallMade";
import Link from "next/link";
import React from "react";

import { event, FEATURES_CLICK } from "../../utils/ga";
import ButtonCapsule from "../ButtonCapsule";
import FeatureSectionHomeCard from "../FeatureSectionHomeCard";
import { styles } from "./styles";

const ColoredLine = () => (
  <hr
    style={{
      border: "0",
      backgroundColor: "#00D4FF",
      height: "0.125em",
      width: "4em",
    }}
  />
);

function FeatureSectionHome({ content }) {
  const classes = styles();
  return (
    <Grid className={classes.root}>
      <Typography variant="h3" className={classes.sectionTitle}>
        {content.title}
      </Typography>
      <ColoredLine />
      <Grid className={classes.container} alignItems={"center"}>
        <Grid className={classes.desktop} container>
          {content.features.map((feature, index) => {
            return (
              <Grid item sm={4} key={index}>
                <FeatureSectionHomeCard
                  image={feature.image}
                  title={feature.title}
                  description={feature.description}
                />
              </Grid>
            );
          })}
        </Grid>
        <Grid className={classes.btn}>
          <Link href={"/features"}>
            <ButtonCapsule
              buttonStyle={classes.capsuleButton}
              text="MORE INFO"
              onClick={() =>
                event({
                  action: FEATURES_CLICK,
                  params: { location: "header" },
                })
              }
              icon={<CallMadeIcon className={classes.callMadeIcon} />}
            />
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default FeatureSectionHome;
