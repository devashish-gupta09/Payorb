import { Grid, makeStyles, Tooltip, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React from "react";
import "cropperjs/dist/cropper.css";

import { ALERT_TYPES } from "../../constants/alerts";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";

function VideoSelect({ videoSrcPath, handleDataUrl, title = "Select video" }) {
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
      <Grid
        container
        alignItems="center"
        justify="space-between"
        style={{ paddingBottom: "1em" }}
      >
        {Alert()}
        <Typography style={{ fontWeight: "bold" }}>{title}</Typography>

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

      {videoSrc ? (
        <video className={classes.videoPreview} controls>
          <source src={videoSrc} type={"video/mp4"}></source>
          <source src={videoSrc} type={"video/ogg"}></source>
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className={classes.videoPreviewPlaceholder}></div>
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
      width: "200px",
    },
  },
  videoPreviewPlaceholder: {
    width: "400px",
    height: "300px",
    border: "2px solid #BDBDBD",
    borderRadius: "5px",
    [theme.breakpoints.down("sm")]: {
      width: "200px",
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
  fileSelector: {
    padding: "1em 0",
  },
}));

export default React.memo(VideoSelect, (next, prev) => {
  return next !== prev;
});
