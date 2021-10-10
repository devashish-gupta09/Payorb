import { TextField, Typography } from "@material-ui/core";
import Linkify from "linkify-react";
import React from "react";

const options = {
  className: "new-link--url-linkify",
};

function EditableTextField({ value, edit, typographyProps, textFieldProps }) {
  return (
    <>
      {edit && textFieldProps ? (
        <TextField {...textFieldProps}></TextField>
      ) : (
        <Typography {...typographyProps}>
          <Linkify tagName="p" options={options}>
            {value}
          </Linkify>
        </Typography>
      )}
    </>
  );
}

export default EditableTextField;
