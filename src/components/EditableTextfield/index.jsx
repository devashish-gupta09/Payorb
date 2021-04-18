import { TextField, Typography } from "@material-ui/core";
import React from "react";

function EditableTextField({ value, edit, typographyProps, textFieldProps }) {
  return (
    <>
      {edit && textFieldProps ? (
        <TextField {...textFieldProps}></TextField>
      ) : (
        <Typography {...typographyProps}>{value}</Typography>
      )}
    </>
  );
}

export default EditableTextField;
