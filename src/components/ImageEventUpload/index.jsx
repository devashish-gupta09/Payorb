import {
  Button,
  Dialog,
  DialogContent,
  Grid,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import "cropperjs/dist/cropper.css";

import ImageSelectAndCrop from "../ImageSelectAndCrop";

import { Edit } from "@material-ui/icons";

function ImageEventUpload({ imageProps, croppedImg, handleCroppedImage }) {
  const classes = styles();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dataUrl, setDataUrl] = React.useState();

  const handleDialog = (ds) => {
    if (typeof ds === "boolean") setDialogOpen(ds);
  };

  // Expect a data url from the ImageSelectAndCrop component
  const handleDataUrl = React.useCallback((data) => {
    setDataUrl(data);
  }, []);

  const handleSave = () => {
    handleCroppedImage(dataUrl);
    setDialogOpen(false);
  };

  return (
    <div>
      {dialogOpen && (
        <Dialog open={dialogOpen} onClose={() => handleDialog(false)}>
          <DialogContent className={classes.dialogContentContainer}>
            <ImageSelectAndCrop
              title="Select poster for event"
              imagePath={croppedImg || imageProps.src}
              handleDataUrl={handleDataUrl}
              cropperAspectRatio={16 / 9}
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
                Save
              </Button>
            </Grid>
          </DialogContent>
        </Dialog>
      )}

      <div
        className={classes.imageContainer}
        onClick={() => {
          handleDialog(true);
        }}
      >
        <div
          style={{
            position: "absolute",
            color: "#BDBDBD",
            padding: "0.5em",
            borderRadius: "50%",
            background: "#01010163",
            right: 5,
            top: 40,
          }}
        >
          <Edit />
        </div>
        <img {...imageProps} src={croppedImg || imageProps.src}></img>
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
    cursor: "pointer",
  },
}));

export default ImageEventUpload;
