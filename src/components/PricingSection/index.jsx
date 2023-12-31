import { Box, Container, Typography } from "@material-ui/core";
import CallMadeIcon from "@material-ui/icons/CallMade";
import Link from "next/link";
import React from "react";

import { event, SIGNUP_CLICK } from "../../utils/ga";
import ButtonCapsule from "../ButtonCapsule";
import PricingCard from "../PricingCard";
import PricingPlan from "../PricingPlan";

import { styles } from "./styles";

const ColoredLine = () => (
  <hr
    style={{
      border: "0",
      backgroundColor: "#00D4FF",
      height: "0.25em",
      width: "4em",
    }}
  />
);

function PricingSection({ content }) {
  const classes = styles();

  return (
    <Container className={classes.container} container>
      <Typography className={classes.heading} align="center">
        {content.title}
      </Typography>
      <ColoredLine />
      <Box className={classes.box}>
        <PricingCard description={content.description} image={content.img} />
        <Box className={classes.planContainer}>
          <Box className={classes.head}>
            <Box className={classes.title}>
              <Typography className={classes.heading1}>Sign up for</Typography>
              <Typography className={classes.heading2}>Free Today!</Typography>
            </Box>
            <Box className={classes.contact}>
              <Typography variant="subtitle1" style={{ fontWeight: "400" }}>
                Would you like to book a free demo?
              </Typography>
              <Typography className={classes.contactText} variant="subtitle1">
                Contact Us
              </Typography>
            </Box>
          </Box>
          <Box className={classes.plan}>
            <Box className={classes.planHead}>
              <Typography variant="h5" className={classes.planName}>
                Basic plan includes
              </Typography>
            </Box>

            {content.plans.map((plan, index) => {
              return <PricingPlan feature={plan.feature} key={index} />;
            })}
            <Box className={classes.button}>
              <Link href={"/signup"}>
                <ButtonCapsule
                  buttonStyle={classes.capsuleButton}
                  text="Get Started"
                  onClick={() =>
                    event({
                      action: SIGNUP_CLICK,
                      params: { location: "header" },
                    })
                  }
                  icon={<CallMadeIcon className={classes.callMadeIcon} />}
                />
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default PricingSection;
