import { Backdrop, makeStyles, Typography } from "@material-ui/core";
import React from "react";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    textAlign: "center",
  },
}));

export default function FullScreenImageViewer({ image, setImage }) {
  const handleClose = () => {
    setImage(false);
  };
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={image} onClick={handleClose}>
      <div style={{ width: "80vw" }}>
        <Typography
          variant="h6"
          style={{ textAlign: "left", width: "90%", marginBottom: "1rem" }}
        >
          {image.title}
        </Typography>
        <img src={image.link} alt="fullscreen-view" style={{ width: "100%" }} />
      </div>
    </Backdrop>
  );
}
