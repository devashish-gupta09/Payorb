import { TextField } from "@material-ui/core";
import React from "react";

function CustomTextField(props) {
  return <TextField {...props}></TextField>;
}

function areEqual(prevProps, nextProps) {
  return prevProps === nextProps;
}

export default React.memo(CustomTextField, areEqual);
