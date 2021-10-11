import {
  Button,
  Dialog,
  DialogContent,
  Grid,
  makeStyles,
  Tooltip,
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import React from "react";
import "cropperjs/dist/cropper.css";

import ImageSelectAndCrop from "../ImageSelectAndCrop";

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
              // cropperAspectRatio={16 / 9}
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
        <div className={classes.editDiv}>
          <Tooltip title="Edit Poster">
            <Edit style={{ fontSize: "1.5em" }} />
          </Tooltip>
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
  editDiv: {
    position: "absolute",
    color: "#BDBDBD",
    padding: "0.3em 0.45em",
    background: "white",
    borderRadius: "2em",
    right: 5,
    top: 40,
    cursor: "pointer",
    zIndex: "1",
    boxShadow: "0px 0px 4px 1px grey",
    "&:hover": {
      boxShadow: "0px 0px 4px 2px #79DFDF",
    },
  },
}));

export default ImageEventUpload;
