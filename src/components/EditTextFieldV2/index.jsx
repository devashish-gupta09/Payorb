import { Grid, InputAdornment, TextField, Typography } from "@material-ui/core";
import { Edit, WorkOutline } from "@material-ui/icons";
import { useState } from "react";

export const EditableTextFieldV2 = ({
  label,
  textFieldProps,
  containerPadding,
  startIcon,
  disable = false,
}) => {
  const [editable, setEditable] = useState(false);

  const toggleEdit = () => {
    if (!disable) setEditable(!editable);
  };

  return (
    <Grid style={{ padding: containerPadding }}>
      <Typography style={{ fontWeight: "600" }}>{label}</Typography>
      <TextField
        disabled={!editable}
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment
              position="start"
              style={{ height: "100%", marginTop: "-0.1em" }}
            >
              {startIcon}
            </InputAdornment>
          ),
          endAdornment: !disable ? (
            <InputAdornment
              position="end"
              style={{ height: "100%", marginTop: "-0.1em", color: "grey" }}
              onClick={toggleEdit}
            >
              <Edit />
            </InputAdornment>
          ) : null,
        }}
        inputProps={{
          style: {
            padding: "0.7em 0.25em",
            color: editable ? "black" : "grey",
          },
        }}
        style={{
          background: "rgb(236 237 244 / 16%)",
          borderRadius: "3px",
          fontWeight: "500",
        }}
        {...textFieldProps}
      ></TextField>
    </Grid>
  );
};
