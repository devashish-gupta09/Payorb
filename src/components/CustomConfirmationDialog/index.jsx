import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import React from "react";

function CustomConfirmationDialog({ onOk, onCancel, show, title }) {
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="lg"
      aria-labelledby="confirmation-dialog-title"
      open={show}
    >
      <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
      <DialogContent style={{ height: "6.5em", width: "18em" }}>
        Are you sure ?
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={onOk} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CustomConfirmationDialog;
