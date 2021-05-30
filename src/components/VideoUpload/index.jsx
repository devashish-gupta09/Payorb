import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
  makeStyles,
  Tooltip,
} from "@material-ui/core";
import { CloudUpload, Edit } from "@material-ui/icons";
import React from "react";
import "cropperjs/dist/cropper.css";

import { ALERT_TYPES } from "../../constants/alerts";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import { delay } from "../../utils/dateTime";
import firebase from "../../utils/firebase";
import { FirebaseAuth } from "../AuthenticationContext";
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
    <div>
      {Alert()}
      {dialogOpen && (
        <Dialog open={dialogOpen} onClose={() => handleDialog(false)}>
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
                borderTop: "4px solid grey",
                padding: "0.5em 0",
              }}
            >
              <Button
                onClick={handleSave}
                style={{
                  background: "#79DFDF",
                  padding: "0.75em 1.5em",
                  borderRadius: "25px",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {progressLoader ? (
                  <CircularProgress
                    size="1.5em"
                    variant="indeterminate"
                    style={{ color: "white", marginRight: "0.2em" }}
                  />
                ) : (
                  <CloudUpload
                    style={{ color: "white", marginRight: "0.2em" }}
                  />
                )}
                &nbsp;Save
              </Button>
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

        <video
          controls
          className={classes.videoPreview}
          src={savedUrl || videoProps.src}
        ></video>
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
  "box-2": {
    padding: "0.5em",
    width: "calc(100%/2 - 1em)",
  },
  fileSelector: {
    padding: "1em 0",
  },
  imageContainer: {
    position: "relative",
    padding: "2em 0",
    [theme.breakpoints.down("sm")]: {
      padding: "0 0 0 0",
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
    padding: "0.2em",
    background: "white",
    right: 5,
    top: 40,
    cursor: "pointer",
    zIndex: "1",
  },
}));

export default VideoUpload;
