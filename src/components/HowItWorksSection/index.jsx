import { Box, Container, Grid, Typography } from "@material-ui/core";

import React from "react";

import WorkCards from "../HowItWorksCards";

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

function HowItWorksSection({ content }) {
  const classes = styles();

  return (
    <Box className={classes.bg}>
      <Container className={classes.container} container>
        <Typography variant="h3" className={classes.heading} align="center">
          {content.title}
        </Typography>
        <ColoredLine />
        <Box className={classes.box}>
          <img src={content.image} layout="fill" className={classes.videoImg} />
        </Box>
        <Grid container>
          {content.works.map((work, index) => {
            return (
              <Grid container item sm={4} key={index}>
                <WorkCards
                  image={work.image}
                  title={work.title}
                  description={work.description}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}

export default HowItWorksSection;
