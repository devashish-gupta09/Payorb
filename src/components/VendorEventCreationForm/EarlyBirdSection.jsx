import DateFnsUtils from "@date-io/date-fns";
import {
  FormControl,
  FormLabel,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

export const EarlyBirdSection = ({
  formik,
  checkDisabled,
  classes,
  handleEarlyBirdDeadlineChange,
}) => {
  return (
    <Grid container style={{ width: "100%", paddingTop: "1em" }}>
      <Grid item container sm={8} style={{ padding: "0 0.5em" }}>
        <Grid
          item
          sm={12}
          container
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            style={{
              color: "#000000",
              fontSize: "1em",
              fontWeight: "500",
              paddingBottom: "0.5em",
            }}
          >
            Early Bird
          </Typography>
          <Switch
            id="earlyBird"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            checked={formik.values.earlyBird}
            error={formik.touched.earlyBird && Boolean(formik.errors.earlyBird)}
            helperText={formik.touched.earlyBird && formik.errors.earlyBird}
            disabled={checkDisabled() || formik.values.trialClass}
          />
        </Grid>
        <Grid item container sm={12}>
          {formik.values.earlyBird ? (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid item sm={12} container spacing={1} alignItems="center">
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
                        padding: "0.5em",
                        background: "#ECEDF4",
                        borderRadius: "4px",
                        // fontSize: "0.8em",
                      },
                      disableUnderline: true,
                    }}
                    // inputVariant="outlined"
                    id="earlyBirdEndDate"
                    // label="Offer End Date"
                    format="dd/MM/yyyy"
                    value={formik.values.earlyBirdDeadline}
                    onChange={handleEarlyBirdDeadlineChange}
                    helperText={
                      formik.touched.earlyBirdDeadline &&
                      formik.errors.earlyBirdDeadline
                    }
                    error={
                      formik.touched.earlyBirdDeadline &&
                      Boolean(formik.errors.earlyBirdDeadline)
                    }
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
                      inputProps: {
                        padding: "0",
                      },
                      style: {
                        padding: "0.5em",
                        background: "#ECEDF4",
                        borderRadius: "4px",
                        // fontSize: "0.8em",
                      },
                      disableUnderline: true,
                    }}
                    // margin="normal"
                    id="time-picker"
                    // label="Offer End Time"
                    value={formik.values.earlyBirdDeadline}
                    onChange={handleEarlyBirdDeadlineChange}
                    helperText={
                      formik.touched.earlyBirdDeadline &&
                      formik.errors.earlyBirdDeadline
                    }
                    error={
                      formik.touched.earlyBirdDeadline &&
                      Boolean(formik.errors.earlyBirdDeadline)
                    }
                    disabled={checkDisabled()}
                  />
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>
          ) : null}
        </Grid>
      </Grid>
      <Grid item sm={4}>
        {formik.values.earlyBird ? (
          <FormControl
            variant="outlined"
            style={{
              width: "100%",
            }}
          >
            <FormLabel
              component="legend"
              style={{
                color: "#000000",
                fontSize: "1em",
                fontWeight: "500",
                padding: "0.5em 0 1em 0",
              }}
            >
              {"Early Bird Price"}
            </FormLabel>

            <TextField
              type="number"
              fullWidth
              className={classes.textInput}
              id="earlyBirdPrice"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.earlyBirdPrice}
              error={
                formik.touched.earlyBirdPrice &&
                Boolean(formik.errors.earlyBirdPrice)
              }
              InputProps={{
                inputProps: {
                  style: {
                    padding: "0.9em",
                    background: "#ECEDF4",
                    borderRadius: "4px",
                  },
                },
                disableUnderline: true,
              }}
              helperText={
                formik.touched.earlyBirdPrice && formik.errors.earlyBirdPrice
              }
            />
          </FormControl>
        ) : null}
      </Grid>
    </Grid>
  );
};
