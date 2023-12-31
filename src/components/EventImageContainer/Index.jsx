import { makeStyles } from "@material-ui/core";
import React from "react";

const EventImageContainer = ({ url }) => {
  const classes = styles();
  const imageContainerRef = React.useRef(null);
  const [imgHeight, setImgHeight] = React.useState(0);
  React.useEffect(() => {
    if (imageContainerRef && imageContainerRef.current) {
      setImgHeight(imageContainerRef.current.offsetWidth / 1.77);
    }
  }, [imageContainerRef.current]);
  return (
    <div
      className={classes.eventImageWrapper}
      style={{
        height: "15em",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
      ref={imageContainerRef}
    >
      <img style={{ width: "100%", objectFit: "cover" }} src={url} />
    </div>
  );
};

export default EventImageContainer;

const styles = makeStyles((theme) => ({
  eventImageWrapper: {
    borderRadius: "5px",
    [theme.breakpoints.down("sm")]: {
      borderRadius: "0.4em",
    },
  },
}));
