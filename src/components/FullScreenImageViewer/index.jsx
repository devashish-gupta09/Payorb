import { Backdrop, Button, makeStyles, Typography } from "@material-ui/core";
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            style={{ textAlign: "left", width: "90%", marginBottom: "1rem" }}
          >
            {image.title}
          </Typography>
          <Button
            style={{
              background: "white",
              padding: "0.5em 1.5em",
              borderRadius: "10px",
              marginLeft: "1em",
            }}
            onClick={() => handleClose()}
          >
            Close
          </Button>
        </div>
        <img
          src={image.link}
          alt="fullscreen-view"
          style={{ height: "90vh" }}
        />
      </div>
    </Backdrop>
  );
}
