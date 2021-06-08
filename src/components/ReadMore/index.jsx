import { makeStyles, Typography } from "@material-ui/core";
import React from "react";

function ReadMore({ percent, text, textProps }) {
  const [readMore, setReadMore] = React.useState(false);
  const classes = style();
  const handleReadMore = () => {
    setReadMore(!readMore);
  };
  return (
    <Typography className={classes.disclaimer} {...textProps}>
      {text.substr(
        0,
        readMore ? text.length : Math.ceil((percent * text.length) / 100)
      )}
      <span onClick={handleReadMore} className={classes.readMore}>
        {readMore ? " Show Less" : " Show More"}
      </span>
    </Typography>
  );
}

const style = makeStyles(() => ({
  readMore: {
    color: "blue",
    textAlign: "justify",
    cursor: "pointer",
  },

  disclaimer: {
    textAlign: "justify",
  },
}));

export default ReadMore;
