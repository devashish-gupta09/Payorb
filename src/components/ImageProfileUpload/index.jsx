import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import React from "react";
import "cropperjs/dist/cropper.css";

import { ALERT_TYPES } from "../../constants/alerts";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import { delay } from "../../utils/dateTime";
import firebase from "../../utils/firebase";
import { FirebaseAuth } from "../AuthenticationContext";
import ImageSelectAndCrop from "../ImageSelectAndCrop";

function ImageProfileUpload({ imageProps }) {
  const classes = styles();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const { Alert, showAlert } = useAlertSnackbar();
  const [progressLoader, setProgress] = React.useState(false);
  const [dataUrl, setDataUrl] = React.useState();
  const [croppedImg, setCroppedImage] = React.useState();

  const handleDialog = (ds) => {
    if (typeof ds === "boolean") setDialogOpen(ds);
  };

  // Expect a data url from the ImageSelectAndCrop component
  const handleDataUrl = React.useCallback((data) => {
    setDataUrl(data);
  }, []);

  const handleSave = async () => {
    const type = dataUrl.substring(
      dataUrl.indexOf(":") + 1,
      dataUrl.indexOf(";")
    );

    const auth = FirebaseAuth.Singleton();
    const user = auth.getUser();

    const ref = firebase.storage().ref();
    const childRef = ref.child(`/profile/${user.uid}.${type.split("/")[1]}`);

    const task = childRef.putString(dataUrl, "data_url");

    setProgress(true);
    task.on(
      "state_changed",
      (snapshot) => {
        switch (snapshot.state) {
          case firebase.storage.TaskState.CANCELED:
            showAlert("Image upload canceled", ALERT_TYPES.ERROR);
            break;
        }
      },
      (error) => {
        let message = "Image cannot be saved";
        switch (error.code) {
          case "storage/unauthorized":
            message = "Unauthorized User";
            break;
          case "storage/canceled":
            message = "User cancelled file upload";
            break;
        }

        setProgress(false);
        showAlert(message, ALERT_TYPES.ERROR);
      },
      () => {
        task.snapshot.ref.getDownloadURL().then(async () => {
          showAlert("Image saved");
          setProgress(false);
          await delay(2000);
          setCroppedImage(dataUrl);
          handleDialog(false);
        });
      }
    );
  };

  return (
    <div>
      {dialogOpen && (
        <Dialog open={dialogOpen} onClose={() => handleDialog(false)}>
          <DialogContent className={classes.dialogContentContainer}>
            {Alert()}
            <ImageSelectAndCrop
              title="Select profile image"
              imagePath={croppedImg || imageProps.src}
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

      <img
        {...imageProps}
        src={croppedImg || imageProps.src}
        onClick={() => {
          handleDialog(true);
        }}
      />
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
}));

export default ImageProfileUpload;
