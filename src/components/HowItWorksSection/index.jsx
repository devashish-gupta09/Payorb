import { Box, Container, Grid, Typography } from "@material-ui/core";
import { Pause, PlayArrow } from "@material-ui/icons";

import React, { useRef, useState } from "react";

import { GENERAL_VIDEO_URL } from "../../constants/video";

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
  const videoPlayerRef = useRef(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const classes = styles(videoPlaying);

  const handleVideoControl = () => {
    if (!videoPlaying) {
      videoPlayerRef.current.play();
      setVideoPlaying(true);
    } else {
      videoPlayerRef.current.pause();
      setVideoPlaying(false);
    }
  };

  return (
    <Box className={classes.bg}>
      <Container className={classes.container} container>
        <Typography variant="h3" className={classes.heading} align="center">
          {content.title}
        </Typography>
        <ColoredLine />
        <Box className={classes.box}>
          <video
            autopictureinpicture
            loop
            ref={videoPlayerRef}
            src={GENERAL_VIDEO_URL}
            className={classes.videoImg}
            poster={"/assets/default-video.png"}
          />
          <Grid
            className={classes.actionButtonContainer}
            style={{
              "& > div": {
                display: "none",
              },
            }}
          >
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              className={classes.videoActionContainer}
              onClick={handleVideoControl}
            >
              {videoPlaying ? (
                <Pause className={classes.videoActions} />
              ) : (
                <PlayArrow className={classes.videoActions} />
              )}
            </Grid>
          </Grid>
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
