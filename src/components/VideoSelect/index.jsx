import { Grid, makeStyles, Tooltip, Typography } from "@material-ui/core";
import { Add, Movie } from "@material-ui/icons";
import React from "react";
import "cropperjs/dist/cropper.css";

import { ALERT_TYPES } from "../../constants/alerts";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import Capsule from "../Capsule";

function VideoSelect({ handleDataUrl, title = "Select video" }) {
  const classes = styles();
  const [videoSrc, setVideoSrc] = React.useState();
  const { Alert, showAlert } = useAlertSnackbar();

  const onInputChange = (e) => {
    // Uploading a single file
    if (e.target.files.length === 1) {
      if (e.target.files[0].size > 5100000) {
        showAlert("Max video size < 5 MB", ALERT_TYPES.ERROR);
        return;
      }

      const reader = new FileReader();
      reader.onloadstart = (e) => {
        showAlert("Loading Video");
      };
      reader.onload = (e) => {
        if (e.target.result) {
          setVideoSrc(e.target.result);
          handleDataUrl(e.target.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      showAlert("Select max 1 video file.");
    }
  };

  return (
    <div>
      {Alert()}
      <Grid style={{ paddingBottom: "2em" }}>
        <Grid container alignItems="center" justify="space-between">
          <Typography
            style={{ fontWeight: "bold", fontSize: "1.4em" }}
            gutterBottom
          >
            {title}
          </Typography>

          <div className={classes.addButton}>
            <label>
              <Tooltip title="Press button to choose file">
                <Typography
                  align="center"
                  style={{
                    padding: "0 1em",
                  }}
                >
                  <Add />
                </Typography>
              </Tooltip>
              <input
                type="file"
                className="video-upload"
                onChange={onInputChange}
                accept={"video/*"}
              />
            </label>
          </div>
        </Grid>
        <Grid container className={classes.capsuleContainer}>
          <Capsule>{"Max Size : 5 MB"}</Capsule>
          <Capsule>{"Duration : 1:00 mins"}</Capsule>
        </Grid>
      </Grid>

      {videoSrc ? (
        <video className={classes.videoPreview} controls>
          <source src={videoSrc} type={"video/mp4"}></source>
          <source src={videoSrc} type={"video/ogg"}></source>
          Your browser does not support the video tag.
        </video>
      ) : (
        <Grid className={classes.previewText}>
          <Grid>
            <Movie style={{ height: "100px", width: "100px" }}></Movie>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

const styles = makeStyles((theme) => ({
  dialogContentContainer: {
    height: "fit-content",
    width: "fit-content",
    "& img ": {
      maxWidth: "100%",
    },
  },
  videoPreview: {
    width: "400px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  "box-2": {
    padding: "0.5em",
    width: "calc(100%/2 - 1em)",
  },
  btn: {
    background: "white",
    color: "black",
    border: "1px solid black",
    padding: "0.5em 1em",
    textDecoration: "none",
    display: "inline-block",
    cursor: "pointer",
  },
  addButton: {
    position: "relative",
    cursor: "pointer",
    overflow: "hidden",
    textAlign: "center",
    "& input": {
      width: "0.1px",
      height: "0.1px",
      opacity: 0,
      overflow: "hidden",
      position: "absolute",
      zIndex: "-1",
    },
    "& label": {
      display: "flex",
      alignItems: "center",
      whiteSpace: "nowrap",
      cursor: "pointer",
      overflow: "hidden",
      "&::after": {
        position: "absolute",
        fontSize: "2.5rem",
        color: "rgba(230, 230, 230, 1)",
        zIndex: 0,
      },
    },
  },
  previewText: {
    width: "400px",
    height: "300px",
    border: "2px solid #BDBDBD",
    borderRadius: "1em",
    padding: "20px",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#BDBDBD",
    boxShadow: "0px 0px 8px 2px #BDBDBD",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  fileSelector: {
    padding: "1em 0",
  },
  capsuleContainer: {
    [theme.breakpoints.down("sm")]: {
      "& > div": {
        padding: "0.2em",
      },
    },
  },
}));

export default React.memo(VideoSelect, (next, prev) => {
  return next !== prev;
});
