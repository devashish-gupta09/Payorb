import DateFnsUtils from "@date-io/date-fns";
import { Grid } from "@material-ui/core";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import moment from "moment";
import React from "react";

function OneOnOneDateSelector({ formik, checkDisabled }) {
  const handleStartDate = (date) => {
    formik.setFieldValue("startDate", date.toISOString());
  };

  const handleEndDate = (date) => {
    formik.setFieldValue("endDate", date.toISOString());
  };

  const handleStartSlotTimeChange = (date) => {
    const momentDate = moment(date);
    const momentStartDate = moment(formik.values.startDate);

    momentDate.set({ second: 0, millisecond: 0 });

    momentStartDate.set({
      hours: momentDate.get("hours"),
      minutes: momentDate.get("minutes"),
      seconds: 0,
    });

    formik.setFieldValue("slotStartTimePerDay", momentDate.toISOString());
    formik.setFieldValue("startDate", momentStartDate.toISOString());
  };

  const handleEndSlotTimeChange = (date) => {
    const momentDate = moment(date);
    const momentEndDate = moment(formik.values.endDate);

    momentDate.set({ second: 0, millisecond: 0 });

    momentEndDate.set({
      hours: momentDate.get("hours"),
      minutes: momentDate.get("minutes"),
      seconds: 0,
    });

    formik.setFieldValue("slotEndTimePerDay", momentDate.toISOString());
    formik.setFieldValue("endDate", momentEndDate.toISOString());
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {/* Start Date and time*/}
      <Grid item sm={6} container spacing={1}>
        <Grid item xs={6}>
          <KeyboardDatePicker
            disablePast={true}
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
            helperText={formik.touched.startDate && formik.errors.startDate}
            error={formik.touched.startDate && Boolean(formik.errors.startDate)}
            disabled={checkDisabled()}
          />
        </Grid>
        <Grid item xs={6}>
          {/* <FormControl variant="outlined" fullWidth> */}
          <KeyboardDatePicker
            disablePast={true}
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
      </Grid>

      {/* End Date and Time */}

      <Grid item sm={6} container spacing={1}>
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
            value={formik.values.slotStartTimePerDay}
            onChange={handleStartSlotTimeChange}
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
            label="End Time"
            value={formik.values.slotEndTimePerDay}
            onChange={handleEndSlotTimeChange}
            helperText={
              formik.touched.slotEndTimePerDay &&
              formik.errors.slotEndTimePerDay
            }
            error={
              formik.touched.slotEndTimePerDay &&
              Boolean(formik.errors.slotEndTimePerDay)
            }
            disabled={checkDisabled()}
          />
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

export default OneOnOneDateSelector;
