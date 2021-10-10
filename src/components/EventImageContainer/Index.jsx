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
        height: imgHeight,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        // transform: "scale(1)",
        border: "1px solid grey",
      }}
      ref={imageContainerRef}
    >
      {/* <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // backgroundImage: `url(${url})`,
          // backgroundPosition: "center",
          // backgroundRepeat: "no-repeat",
          // backgroundSize: "cover",
          // filter: "blur(8px)",

          position: "absolute",
          zIndex: "0",
          height: imgHeight,
          width: `${imageContainerRef?.current?.offsetWidth || 0}px`,
        }}
      ></div> */}
      {/* <div style={{ overflow: "hidden", position: "relative", zIndex: "10" }}> */}
      <img style={{ height: imgHeight }} src={url} />
      {/* </div> */}
    </div>
  );
};

export default EventImageContainer;

const styles = makeStyles((theme) => ({
  eventImageWrapper: {
    borderRadius: "6px",
    [theme.breakpoints.down("sm")]: {
      borderRadius: "0.4em",
    },
  },
}));
