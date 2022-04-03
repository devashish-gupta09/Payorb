import {
  Button,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  makeStyles,
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
    <div style={{ height: "30vh" }}>
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
        <Grid container justifyContent="flex-end" className={classes.editDiv}>
          <IconButton
            size={"small"}
            style={{
              boxShadow: "0 0 3px 0 rgba(0,0,0,0.25)",
              background: "#FFFFFF",
            }}
          >
            <Edit />
          </IconButton>
        </Grid>

        {croppedImg || imageProps.src ? (
          <img {...imageProps} src={croppedImg || imageProps.src}></img>
        ) : (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ height: "100%", width: "100%" }}
          >
            <img
              src={"/assets/defaultImageIcon.svg"}
              style={{ height: "4em", opacity: "0.4" }}
            />
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
  "box-2": {
    padding: "0.5em",
    width: "calc(100%/2 - 1em)",
  },
  fileSelector: {
    padding: "1em 0",
  },
  imageContainer: {
    position: "relative",
    // padding: "2em 0",
    cursor: "pointer",
    height: "100%",
  },
  editDiv: {
    background: "transparent",
    position: "absolute",
    color: "#BDBDBD",
    padding: "0.5em 0.5em",
    width: "fit-content",
    right: "0",
    cursor: "pointer",
    zIndex: "2100",
    "&:hover": {},
  },
}));

export default ImageEventUpload;
