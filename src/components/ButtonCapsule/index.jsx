import { Button } from "@material-ui/core";
import React from "react";
import { styles } from "./styles";

function ButtonCapsule({ type, text, onClick, buttonStyle }) {
  const classes = styles();
  return (
    <Button
      type={type}
      onClick={onClick}
      className={`${classes.signupButton} ${buttonStyle}`}
    >
      {text}
    </Button>
  );
}

export default ButtonCapsule;
