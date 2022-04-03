import { Grid, IconButton, makeStyles } from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import { useState } from "react";

import { DEFAULT_EVENT_IMAGE } from "../../constants/images";

import ImageEventUpload from "../ImageEventUpload";

// croppedImgs = [{ id, img }];

const COVER_BANNER_LIMIT = 4;

export const EventCoverUpload = ({
  croppedImgs,
  handleCroppedImgs,
  eventData,
}) => {
  const [viewPortIndex, setViewPortIndex] = useState(0);

  const incrementViewPortIndex = () => {
    if (viewPortIndex + 1 >= COVER_BANNER_LIMIT) {
      setViewPortIndex(0);
    } else {
      setViewPortIndex(viewPortIndex + 1);
    }
  };

  const decrementViewPortIndex = () => {
    if (viewPortIndex - 1 < 0) {
      setViewPortIndex(0);
    } else {
      setViewPortIndex(viewPortIndex - 1);
    }
  };

  const classes = styles();
  return (
    <Grid className={classes.root}>
      {/* Arrow Container */}
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className={classes.arrowContainer}
      >
        <IconButton size="small" onClick={decrementViewPortIndex}>
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton size="small" onClick={incrementViewPortIndex}>
          <KeyboardArrowRight />
        </IconButton>
      </Grid>

      <Grid style={{ height: "30vh", width: "100%" }}>
        <ImageEventUpload
          croppedImg={croppedImgs[viewPortIndex]}
          handleCroppedImage={handleCroppedImgs}
          imageProps={{
            src: DEFAULT_EVENT_IMAGE,
            className: classes.eventImage,
          }}
        />
      </Grid>
      <Grid
        container
        alignItems="center"
        style={{
          position: "absolute",
          width: "100%",
          bottom: "0",
          padding: "0.5em 0.5em",
        }}
      >
        <Grid
          style={{
            padding: "0.75em 1.25em",
            border: "1.5px solid #D6D6D9",
            background: "#FFFFFF",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "center",
            width: "4vw",
            height: "7vh",
            alignItems: "center",
            marginRight: "0.5em",
          }}
        >
          <img
            src="/assets/defaultImageIcon.svg"
            style={{ width: "1.5vw", opacity: "0.4" }}
          />
        </Grid>

        <Grid
          style={{
            overflow: "hidden",
            width: "4vw",
            height: "7vh",
            marginRight: "0.5em",
            borderRadius: "5px",
          }}
        >
          <img src={DEFAULT_EVENT_IMAGE} style={{ width: "5vw" }} />
        </Grid>

        <Grid
          style={{
            padding: "0.75em 1.25em",
            border: "1.5px solid #D6D6D9",
            background: "#FFFFFF",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "center",
            width: "4vw",
            height: "7vh",
            alignItems: "center",
            marginRight: "0.5em",
          }}
        >
          <img
            src="/assets/defaultImageIcon.svg"
            style={{ width: "1.5vw", opacity: "0.4" }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

const styles = makeStyles((theme) => ({
  root: {
    // height: "fit-content",
    width: "100%",
    position: "relative",
    background: "#F6F6FA",
    borderRadius: "5px",
    overflow: "hidden",
  },
  arrowContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",
    background: "transparent",
    zIndex: "2000",
  },
  eventImage: {
    height: "30vh",
    width: "100%",
    objectFit: "cover",
    "&:hover": {
      boxShadow: "0px 0px 7px 0px grey",
    },
  },
}));
