import { Button, CircularProgress } from "@material-ui/core";
import React from "react";

import { styles } from "./styles";

export const DangerouslySetInnterHtml = ({ text }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: text,
      }}
    ></div>
  );
};

function ButtonCapsule({
  disabled = false,
  type,
  text,
  onClick,
  buttonStyle,
  showLoader,
  rootStyle,
  icon,
}) {
  const classes = styles();

  return (
    <Button
      type={type}
      onClick={onClick}
      classes={{ root: `${rootStyle && ""}` }}
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
      {<DangerouslySetInnterHtml text={text} />} {icon ? icon : null}
    </Button>
  );
}

export default ButtonCapsule;
