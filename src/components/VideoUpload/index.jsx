import {
  Dialog,
  DialogContent,
  Grid,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { CloudUpload, Edit, Movie } from "@material-ui/icons";
import React from "react";
import "cropperjs/dist/cropper.css";

import { ALERT_TYPES } from "../../constants/alerts";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import { delay } from "../../utils/dateTime";
import firebase from "../../utils/firebase";
import { FirebaseAuth } from "../AuthenticationContext";
import ButtonCapsule from "../ButtonCapsule";
import Capsule from "../Capsule";
import VideoSelect from "../VideoSelect";

function VideoUpload({ videoProps }) {
  const classes = styles();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dataUrl, setDataUrl] = React.useState();
  const [savedUrl, setSavedUrl] = React.useState();
  const { Alert, showAlert } = useAlertSnackbar();
  const [progressLoader, setProgress] = React.useState(false);

  const handleDialog = React.useCallback((ds) => {
    if (typeof ds === "boolean") setDialogOpen(ds);
  });

  // Expect a data url from the ImageSelectAndCrop component
  const handleDataUrl = React.useCallback((data) => {
    setDataUrl(data);
  }, []);

  const handleSave = async () => {
    // handleCroppedImage(dataUrl);

    setProgress(true);
    try {
      await handleVideoUpload();
      setProgress(false);
      showAlert("Video uploaded");
      await delay(1000);
      setSavedUrl(dataUrl);
      handleDialog(false);
    } catch (err) {
      setProgress(false);
      showAlert(err.message, ALERT_TYPES.ERROR);
    }
  };

  const handleVideoUpload = React.useCallback(async () => {
    const type = dataUrl.substring(
      dataUrl.indexOf(":") + 1,
      dataUrl.indexOf(";")
    );

    const auth = FirebaseAuth.Singleton();
    const user = auth.getUser();

    if (!user) {
      showAlert("Not an authorized user");
      return;
    }

    const ref = firebase.storage().ref();
    const childRef = ref.child(`/intros/${user.uid}.${type.split("/")[1]}`);

    await childRef.putString(dataUrl, "data_url");
  }, [dataUrl]);

  return (
    <div className={classes.root}>
      {Alert()}
      {dialogOpen && (
        <Dialog
          PaperProps={{
            style: {
              margin: "1em",
            },
          }}
          open={dialogOpen}
          onClose={() => handleDialog(false)}
        >
          <DialogContent className={classes.dialogContentContainer}>
            <VideoSelect
              videoSrcPath={videoProps.src}
              handleDataUrl={handleDataUrl}
            />

            <Grid
              container
              justify="center"
              style={{
                marginTop: "0.5em",
                padding: "1em 0",
              }}
            >
              <ButtonCapsule
                buttonStyle={classes.saveButton}
                disabled={!dataUrl}
                text={"Save"}
                onClick={handleSave}
                icon={<CloudUpload className={classes.saveIconButton} />}
                showLoader={progressLoader}
              />
            </Grid>
          </DialogContent>
        </Dialog>
      )}

      <div className={classes.imageContainer}>
        <div
          onClick={() => {
            handleDialog(true);
          }}
          className={classes.editDiv}
        >
          <Tooltip title="Add introductory video">
            <Edit />
          </Tooltip>
        </div>

        {savedUrl || videoProps.src ? (
          <video
            controls
            className={classes.videoPreview}
            src={savedUrl || videoProps.src}
          ></video>
        ) : (
          <Grid className={classes.previewText}>
            <Grid>
              <Typography
                variant="h6"
                style={{ fontWeight: "bold" }}
                gutterBottom
              >
                Introductory video
              </Typography>
              <Grid container className={classes.capsuleContainer}>
                <Capsule>{"Max Size : 5 MB"}</Capsule>
                <Capsule>{"Duration : 1:00 mins"}</Capsule>
              </Grid>
              <Typography align="center" style={{ paddingTop: "1em" }}>
                <Movie style={{ height: "100px", width: "100px" }}></Movie>
              </Typography>
              <ul>
                <li>Size of the video should be less than 5 MB</li>
                <li>
                  Make sure the duration of video is less than <b>1:00 mins</b>
                </li>
              </ul>
            </Grid>
          </Grid>
        )}
      </div>
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
  saveButton: {
    padding: "1em 2.5em",
    "& > span": {
      color: "white",
      fontWeight: "bold",
    },
  },
  saveIconButton: {
    marginLeft: "0.4em",
  },
  "box-2": {
    padding: "0.5em",
    width: "calc(100%/2 - 1em)",
  },
  fileSelector: {
    padding: "1em 0",
  },
  imageContainer: {
    position: "relative",
    height: "100%",

    [theme.breakpoints.down("sm")]: {
      border: 0,
      borderRadius: 0,
    },
  },
  videoPreview: {
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  editDiv: {
    position: "absolute",
    color: "#BDBDBD",
    padding: "0.2em 0.3em",
    background: "white",
    top: 20,
    cursor: "pointer",
    zIndex: "1",
    right: 20,
    borderRadius: "50%",
    boxShadow: "0px 0px 6px 2px #BDBDBD",
    [theme.breakpoints.down("sm")]: {
      top: 20,
      right: 10,
    },
  },
  root: {
    height: "100%",
  },
  previewText: {
    padding: "2em 0",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#BDBDBD",
    boxShadow: "0px 0px 16px 2px #BDBDBD",
    borderRadius: "1em",
    [theme.breakpoints.down("sm")]: {
      padding: "2em 1em 2em 1em",
      "& > div": {
        width: "100%",
      },
      "& > div > ul": {
        display: "none",
      },
      justifyContent: "flex-start",
      boxShadow: "0",
    },
  },
  capsuleContainer: {
    [theme.breakpoints.down("sm")]: {
      display: "block",
      width: "100%",
      "& > div": {
        padding: "0.2em 0",
      },
    },
  },
}));

export default VideoUpload;
