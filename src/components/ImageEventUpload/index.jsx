import {
  Button,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { CloseRounded, Edit } from "@material-ui/icons";
import React from "react";
import "cropperjs/dist/cropper.css";

import { COVER_BANNER_LIMIT } from "../EventCoverUpload";
import ImageSelectAndCrop from "../ImageSelectAndCrop";

function ImageEventUpload({
  index,
  imageProps,
  croppedImgs,
  handleCroppedImage,
  handleDelete,
  eventData,
}) {
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
    // handleCroppedImage(dataUrl);
    setDialogOpen(false);
  };

  const handleAddMore = () => {
    // setDataUrl();
    handleCroppedImage(dataUrl);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <div style={{ height: "30vh" }}>
      {dialogOpen && (
        <Dialog
          PaperProps={{
            className: classes.dialogPaper,
          }}
          open={dialogOpen}
          onClose={() => handleDialog(false)}
        >
          <DialogContent className={classes.dialogContentContainer}>
            <div style={{ padding: "1em" }}>
              <ImageSelectAndCrop
                title="Add event cover"
                imagePath={croppedImgs?.[index] || imageProps.src}
                handleDataUrl={handleDataUrl}
                handleClose={handleClose}
                allowAdd={
                  croppedImgs?.length < COVER_BANNER_LIMIT ? true : false
                }
              />
            </div>

            <Grid container style={{ padding: "0 0.5em 0 1em" }}>
              {(croppedImgs ?? eventData?.coverBannerImages)?.map(
                (cover, index) => (
                  <Grid
                    item
                    sm={3}
                    key={index}
                    style={{
                      height: "3.5em",
                    }}
                  >
                    <Grid
                      style={{
                        height: "100%",
                        width: "100%",
                        paddingRight: "0.5em",
                      }}
                    >
                      <Grid
                        style={{
                          height: "100%",
                          width: "100%",
                          borderRadius: "5px",
                          // overflow: "hidden",
                          position: "relative",
                        }}
                      >
                        <CloseRounded
                          onClick={
                            handleDelete
                              ? () => {
                                  handleDelete(index);
                                }
                              : null
                          }
                          style={{
                            color: "grey",
                            background: "white",
                            boxShadow: "0 0 0 2px solid",
                            borderRadius: "50%",
                            cursor: "pointer",
                            position: "absolute",
                            right: "-12",
                            top: "-12",
                            zIndex: "500",
                            padding: "2.5px",
                          }}
                        />
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
                )
              )}
            </Grid>

            <Grid
              container
              justifyContent="flex-end"
              style={{
                background: "#F6F6FA",
                marginTop: "0.5em",
                padding: "1em",
              }}
            >
              {(croppedImgs ?? eventData?.coverBannerImages)?.length <
              COVER_BANNER_LIMIT ? (
                <Button
                  onClick={handleAddMore}
                  style={{
                    padding: "0.25em 1.5em",
                    borderRadius: "25px",
                    border: "2px solid #8B8B8B",
                    color: "#8B8B8B",
                    textTransform: "none",
                    marginRight: "0.5em",
                  }}
                >
                  Add
                </Button>
              ) : null}

              <Button
                onClick={handleSave}
                style={{
                  padding: "0.25em 1.5em",
                  borderRadius: "25px",
                  border: "2px solid #8B8B8B",
                  color: "#8B8B8B",
                  textTransform: "none",
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
              padding: "0.25em",
            }}
          >
            <Edit />
          </IconButton>
        </Grid>

        {croppedImgs?.[index] || imageProps.src ? (
          <img
            {...imageProps}
            src={croppedImgs?.[index] || imageProps.src}
          ></img>
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
    "& img ": {
      maxWidth: "100%",
    },
    "&.MuiDialogContent-root": {
      padding: 0,
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
    zIndex: "200",
    "&:hover": {},
  },
  dialogPaper: {
    width: "30%",
    padding: 0,
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
    },
    "&.MuiDialog-paper": {
      padding: 0,
    },
  },
}));

export default ImageEventUpload;
