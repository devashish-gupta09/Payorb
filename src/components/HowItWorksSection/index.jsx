import { Box, Container, Grid, Typography } from "@material-ui/core";
import Image from "next/image";

import React from "react";

import WorkCards from "../HowItWorksCards";

import { styles } from "./styles";

function HowItWorksSection({ content }) {
  const classes = styles();

  return (
    <Container className={classes.container} container>
      <Typography variant="h2" className={classes.heading} align="center">
        {content.title}
      </Typography>
      <Box className={classes.box}>
        <Image
          src={content.image}
          layout="fill"
          className={classes.videoImg}
        ></Image>
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
  );
}

export default HowItWorksSection;
