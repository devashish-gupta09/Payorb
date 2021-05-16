import DateFnsUtils from "@date-io/date-fns";
import { Grid } from "@material-ui/core";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React from "react";

function OneTimeDateSelector({ formik, checkDisabled }) {
  const handleStartDate = (date) => {
    formik.setFieldValue("startDate", date.toISOString());
  };

  const handleEndDate = (date) => {
    formik.setFieldValue("endDate", date.toISOString());
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {/* Start Date and time*/}
      <Grid item sm={6} container spacing={1}>
        <Grid item xs={6}>
          <KeyboardDatePicker
            KeyboardButtonProps={{
              style: {
                paddingLeft: "0.2em",
                paddingRight: "0.4em",
              },
            }}
            InputProps={{
              style: {
                padding: 0,
              },
            }}
            inputVariant="outlined"
            margin="normal"
            id="startDate"
            label="Start Date"
            format="dd/MM/yyyy"
            value={formik.values.startDate}
            onChange={handleStartDate}
            disabled={checkDisabled()}
          />
        </Grid>
        <Grid item xs={6}>
          <KeyboardTimePicker
            KeyboardButtonProps={{
              style: {
                paddingLeft: "0.2em",
                paddingRight: "0.4em",
              },
            }}
            InputProps={{
              style: {
                padding: 0,
              },
            }}
            inputVariant="outlined"
            margin="normal"
            id="time-picker"
            label="Start Time"
            value={formik.values.startDate}
            onChange={handleStartDate}
            disabled={checkDisabled()}
          />
        </Grid>
      </Grid>

      {/* End Date and Time */}

      <Grid item sm={6} container spacing={1}>
        <Grid item xs={6}>
          {/* <FormControl variant="outlined" fullWidth> */}
          <KeyboardDatePicker
            KeyboardButtonProps={{
              style: {
                paddingLeft: "0.2em",
                paddingRight: "0.4em",
              },
            }}
            InputProps={{
              style: {
                padding: 0,
              },
            }}
            inputVariant="outlined"
            margin="normal"
            id="endDate"
            label="End Date"
            format="dd/MM/yyyy"
            value={formik.values.endDate}
            onChange={handleEndDate}
            helperText={formik.touched.endDate && formik.errors.endDate}
            error={formik.touched.endDate && Boolean(formik.errors.endDate)}
            disabled={checkDisabled()}
          />

          {/* </FormControl> */}
        </Grid>
        <Grid item xs={6}>
          <KeyboardTimePicker
            KeyboardButtonProps={{
              style: {
                paddingLeft: "0.2em",
                paddingRight: "0.4em",
              },
            }}
            InputProps={{
              style: {
                padding: 0,
              },
            }}
            inputVariant="outlined"
            margin="normal"
            id="time-picker"
            label="End Time"
            value={formik.values.endDate}
            onChange={handleEndDate}
            helperText={formik.touched.endDate && formik.errors.endDate}
            error={formik.touched.endDate && Boolean(formik.errors.endDate)}
            disabled={checkDisabled()}
          />
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

export default OneTimeDateSelector;
