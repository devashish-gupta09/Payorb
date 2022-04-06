import { Box, Grid, Typography } from "@material-ui/core";
import { Pause, PlayArrow } from "@material-ui/icons";
import CallMadeIcon from "@material-ui/icons/CallMade";
import Link from "next/link";
import React, { useRef, useState } from "react";

import { GENERAL_VIDEO_URL } from "../../constants/video";

import { event, SIGNUP_CLICK } from "../../utils/ga";
import ButtonCapsule from "../ButtonCapsule";
import { styles } from "./styles";

function FeaturesContent({ content }) {
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
    <Grid className={classes.container}>
      <Grid className={classes.textContainer}>
        <Grid container sx={{ whiteSpace: "nowrap", overflowX: "auto" }}>
          <Typography
            variant="h3"
            className={`${classes.titleSection} ${classes.titleSection1}`}
          >
            {content.titleSection1}&nbsp;{" "}
            <Typography className={`${classes.aquaText} `}>
              {content.titleSection2}
            </Typography>
          </Typography>
        </Grid>
        <Typography className={classes.descriptionText}>
          {content.description}
        </Typography>
        <Grid container className={classes.buttonContain}>
          <Link href={"/signup"}>
            <ButtonCapsule
              buttonStyle={classes.capsuleButton}
              text="Get Started"
              onClick={() =>
                event({ action: SIGNUP_CLICK, params: { location: "header" } })
              }
              icon={<CallMadeIcon className={classes.callMadeIcon} />}
            />
          </Link>
        </Grid>
      </Grid>
      <Grid className={classes.imgContainer}>
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
      </Grid>
    </Grid>
  );
}

export default FeaturesContent;
