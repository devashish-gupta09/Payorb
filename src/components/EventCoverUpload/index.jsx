import { Grid, IconButton, makeStyles } from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import { useState } from "react";

import ImageEventUpload from "../ImageEventUpload";

export const COVER_BANNER_LIMIT = 4;

export const EventCoverUpload = ({
  allowUploads = true,
  croppedImgs,
  handleCroppedImgs,
  eventData,
  handleDelete,
  height,
}) => {
  const classes = styles();
  const [viewPortIndex, setViewPortIndex] = useState(0);

  const incrementViewPortIndex = () => {
    if (
      viewPortIndex + 1 >= eventData?.coverBannerImages.length ||
      viewPortIndex + 1 >= COVER_BANNER_LIMIT
    ) {
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

  return (
    <Grid className={classes.root}>
      {/* Arrow Container */}
      {(croppedImgs ?? eventData?.coverBannerImages)?.length > 1 ? (
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          className={classes.arrowContainer}
        >
          <IconButton size="small" onClick={decrementViewPortIndex}>
            <KeyboardArrowLeft className={classes.arrow} />
          </IconButton>
          <IconButton size="small" onClick={incrementViewPortIndex}>
            <KeyboardArrowRight className={classes.arrow} />
          </IconButton>
        </Grid>
      ) : null}

      <Grid style={{ height: height ? height : "27.5vh", width: "100%" }}>
        {allowUploads ? (
          <ImageEventUpload
            index={viewPortIndex}
            croppedImgs={croppedImgs}
            handleCroppedImage={handleCroppedImgs}
            imageProps={{
              src:
                croppedImgs?.[viewPortIndex] ||
                eventData?.coverBannerImages[viewPortIndex],
              className: classes.eventImage,
            }}
            eventData={eventData}
            handleDelete={handleDelete}
          />
        ) : (
          <img
            src={croppedImgs[viewPortIndex]}
            style={{ height: "100%", width: "100%" }}
          />
        )}
      </Grid>
      <Grid
        container
        alignItems="stretch"
        style={{
          position: "absolute",
          width: "100%",
          bottom: "0",
          padding: "0.5em 0.5em",
        }}
      >
        {(croppedImgs ?? eventData?.coverBannerImages)?.map((cover, index) => {
          return (
            <Grid
              key={index}
              item
              container
              justifyContent="center"
              alignItems="center"
              xs={3}
              style={{
                height: "4em",
              }}
            >
              <Grid
                style={{ height: "100%", width: "100%", paddingRight: "0.5em" }}
              >
                <Grid
                  className={`${
                    index === viewPortIndex
                      ? classes.activeBorder
                      : classes.inactiveBorder
                  }`}
                  style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: "5px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={cover}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          );
        })}
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
    height: "fit-content",
    top: 0,
    bottom: 0,
    margin: "auto",
    width: "100%",
    background: "transparent",
    zIndex: "200",
  },
  eventImage: {
    height: "30vh",
    width: "100%",
    objectFit: "cover",
    "&:hover": {
      boxShadow: "0px 0px 7px 0px grey",
    },
  },
  activeBorder: {
    border: "2px solid #68FDF3",
  },
  inactiveBorder: {
    border: "2px solid #ffffff",
  },
  arrow: {
    transform: "scale(1.5)",
    color: "white",
    borderRadius: "50%",
    boxShadow: "0 0 1px rgba(0, 0, 0, 0.5)",
    background: "rgba(1,1,1,0.05)",
  },
}));
