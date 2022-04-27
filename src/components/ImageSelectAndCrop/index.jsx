import {
  Grid,
  makeStyles,
  Tooltip,
  Typography,
  useTheme,
} from "@material-ui/core";
import { AddPhotoAlternate, Close, InsertPhoto } from "@material-ui/icons";
import React, { useRef } from "react";
import "cropperjs/dist/cropper.css";
import { Cropper } from "react-cropper";

import { ALERT_TYPES } from "../../constants/alerts";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";

function ImageSelectAndCrop({
  imagePath,
  handleDataUrl,
  title = "Select image",
  cropperAspectRatio,
  handleClose,
  allowAdd = true,
}) {
  console.log("ALLOW ADD", allowAdd);
  const classes = styles();
  const [imgSrc, setImgSrc] = React.useState(imagePath);
  const { Alert, showAlert } = useAlertSnackbar();
  const cropperRef = useRef();
  const theme = useTheme();
  // const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const onInputChange = (e) => {
    // Uploading a single file
    if (e.target.files.length === 1) {
      if (e.target.files[0].size > 3145728) {
        showAlert("Max image size < 3 MB", ALERT_TYPES.ERROR);
        return;
      }

      const reader = new FileReader();
      reader.onloadstart = (e) => {
        showAlert("Loading Image");
      };
      reader.onload = (e) => {
        if (e.target.result) {
          setImgSrc(e.target.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      showAlert("Select max 1 image file.");
    }
  };

  const handleOnCrop = () => {
    try {
      const { height, width } = cropperRef.current.cropper.getData();

      const imageEl = cropperRef.current.cropper
        .getCroppedCanvas()
        .toDataURL("image/jpeg", height * width > 1054000 ? 0.6 : 0.75);

      handleDataUrl(imageEl);
    } catch (err) {
      return;
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
        <Typography style={{ fontWeight: "600", fontSize: "1.125em" }}>
          {title}
        </Typography>

        <Grid container style={{ width: "fit-content" }}>
          {/* {allowAdd ? ( */}
          <div className={classes.addButton}>
            <label>
              <Tooltip title="Press button to choose file">
                <Typography
                  align="center"
                  style={{
                    padding: "0 1em",
                  }}
                >
                  <AddPhotoAlternate />
                </Typography>
              </Tooltip>
              <input
                type="file"
                className="image-upload"
                accept="image/*"
                onChange={onInputChange}
              />
            </label>
          </div>
          {/* ) : null} */}

          {handleClose ? <Close onClick={handleClose} /> : null}
        </Grid>
      </Grid>
      {imgSrc ? (
        <Cropper
          checkCrossOrigin={false}
          src={imgSrc}
          style={{ height: 300, width: "100%" }}
          guides={true}
          ref={cropperRef}
          crop={handleOnCrop}
          aspectRatio={cropperAspectRatio ?? NaN}
        />
      ) : (
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          style={{
            height: "300px",
            width: "100%",
            background: "#F6F6FA",
            borderRadius: "8px",
          }}
        >
          <InsertPhoto
            style={{
              color: "#DDDDDD",
              border: "2px solid",
              borderRadius: "5px",
              transform: "scale(4)",
              background: "#F6F6FA",
            }}
          />
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

export default React.memo(ImageSelectAndCrop, (next, prev) => {
  return next !== prev;
});
