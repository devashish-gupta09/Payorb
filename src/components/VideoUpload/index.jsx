import {
  Dialog,
  DialogContent,
  Grid,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import {
  CloudUpload,
  DeleteOutline,
  Edit,
  Info,
  Movie,
} from "@material-ui/icons";
import { withStyles } from "@material-ui/styles";
import React from "react";
import "cropperjs/dist/cropper.css";

import { ALERT_TYPES } from "../../constants/alerts";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import { updateUser } from "../../services/auth";
import { delay } from "../../utils/dateTime";
import firebase from "../../utils/firebase";
import { FirebaseAuth } from "../AuthenticationContext";
import ButtonCapsule from "../ButtonCapsule";
import VideoSelect from "../VideoSelect";

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: "0.75em",
  },
}))(Tooltip);

function VideoUpload({ videoProps, isVendor, updateProfile, profileData }) {
  const classes = styles();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dataUrl, setDataUrl] = React.useState();
  const [savedUrl, setSavedUrl] = React.useState();
  const { Alert, showAlert } = useAlertSnackbar();
  const [progressLoader, setProgress] = React.useState(false);

  const handleVideoDelete = async () => {
    showAlert("Deleting the video");
    const temp = { ...profileData };
    temp.videoLink = "";
    await updateUser({ videoLink: "" });
    updateProfile(temp);
    setDataUrl("");
    setSavedUrl("");
    showAlert("Video Deleted");
  };

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
        {isVendor && (
          <div className={classes.editDiv}>
            <LightTooltip
              arrow={true}
              title={
                <Grid>
                  <ul>
                    <li>Size of the video should be less than 5 MB</li>
                    <li>
                      Duration of video should be less than <b>1:00 mins</b>
                    </li>
                  </ul>
                </Grid>
              }
            >
              <Info />
            </LightTooltip>
            <Edit
              style={{ color: "#008EFF", marginLeft: "0.5em" }}
              onClick={() => {
                handleDialog(true);
              }}
            />
            {savedUrl || videoProps.src ? (
              <DeleteOutline
                onClick={handleVideoDelete}
                style={{ color: "#FC6767", marginLeft: "0.5em" }}
              />
            ) : null}
          </div>
        )}

        {savedUrl || videoProps.src ? (
          <video
            controls
            className={classes.videoPreview}
            src={savedUrl || videoProps.src}
          ></video>
        ) : (
          isVendor && (
            <Grid className={classes.previewText}>
              <Grid style={{ padding: "0.5em" }}>
                <Typography align="center" style={{ paddingTop: "1em" }}>
                  <Movie style={{ height: "100px", width: "100px" }}></Movie>
                </Typography>
              </Grid>
            </Grid>
          )
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
    background: "#ECEDF4",
    borderRadius: "8px",
    minHeight: "400px",
    [theme.breakpoints.down("sm")]: {
      border: 0,
      borderRadius: "8px",
      minHeight: "fit-content",
    },
  },
  videoPreview: {
    width: "100%",
    borderRadius: "8px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  editDiv: {
    position: "absolute",
    color: "#BDBDBD",
    top: 20,
    zIndex: "1",
    right: 20,
    "& > svg": { fontSize: "1.75em" },
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
    minHeight: "400px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#BDBDBD",
    borderRadius: "8px",
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
