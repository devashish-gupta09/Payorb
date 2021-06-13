import { TextField, Typography } from "@material-ui/core";
import React from "react";
import Linkify from "react-linkify";

function EditableTextField({ value, edit, typographyProps, textFieldProps }) {
  return (
    <>
      {edit && textFieldProps ? (
        <TextField {...textFieldProps}></TextField>
      ) : (
        <Typography {...typographyProps}>
          <Linkify
            component="a"
            properties={{
              target: "_blank",
            }}
          >
            {value}
          </Linkify>
        </Typography>
      )}
    </>
  );
}

export default EditableTextField;
