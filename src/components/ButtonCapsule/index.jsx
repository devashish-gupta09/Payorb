import { Button, CircularProgress } from "@material-ui/core";
import React from "react";

import { styles } from "./styles";

function ButtonCapsule({
  disabled = false,
  type,
  text,
  onClick,
  buttonStyle,
  showLoader,
}) {
  const classes = styles();
  return (
    <Button
      type={type}
      onClick={onClick}
      className={`${classes.signupButton} ${buttonStyle}`}
      disabled={disabled}
    >
      {showLoader && (
        <CircularProgress
          size={"1.5em"}
          thickness={6}
          style={{ marginRight: "1em" }}
        />
      )}
      {text}
    </Button>
  );
}

export default ButtonCapsule;
