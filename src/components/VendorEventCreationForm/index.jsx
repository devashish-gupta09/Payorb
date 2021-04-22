import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  FormHelperText,
} from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";
import {
  EVENT_CATEGORY,
  EVENT_DESCRIPTION,
  EVENT_MODES,
  EVENT_TYPES,
} from "../../constants/events";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { styles } from "./styles";
import { globalStyles } from "../../../styles/globalStyles";
import { appColors } from "../../../styles/colors";
import { FormatTextdirectionRToLTwoTone } from "@material-ui/icons";
import { createEventValidationSchema } from "../../validations/events";
import ButtonCapsule from "../ButtonCapsule";
import { PAGE_PATHS } from "../../constants/paths";
import { useRouter } from "next/router";

function getCreationFormInitialState() {
  return {
    name: "",
    location: "",
    category: EVENT_CATEGORY.EDUCATION,
    address: "",
    description: "",
    price: 0,
    mode: EVENT_MODES.ONLINE,
    totalTickets: 0,
    link: "",
    type: "",
    startDate: new Date(),
    endDate: new Date(),
  };
}

function getEventTypeDescription(type) {
  if (type !== "") {
    return EVENT_DESCRIPTION[type];
  }
  return "";
}

function VendorEventCreationForm() {
  const classes = styles();
  const globalClasses = globalStyles();
  const router = useRouter();

  const handleStartDate = (date) => {
    formik.setFieldValue("startDate", date.toUTCString());
  };

  const handleEndDate = (date) => {
    formik.setFieldValue("endDate", date.toUTCString());
  };

  const handleEventTypeChange = (event) => {
    formik.setFieldValue("type", event.target.value);
  };

  const handleEventMode = (event) => {
    formik.setFieldValue("mode", event.target.value);
  };

  const formik = useFormik({
    initialValues: getCreationFormInitialState(),
    validationSchema: createEventValidationSchema,

    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleCancel = () => {
    router.push(PAGE_PATHS.VENDOR_DASHBOARD_EVENTS);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        justify="space-between"
        alignItems="flex-end"
        className={classes.titleContainer}
      >
        <Grid>
          <Typography style={{ color: appColors.grey }}>
            START FOR FREE
          </Typography>
          <Typography className={`${globalStyles.bold}`} variant={"h3"}>
            Create Event
          </Typography>
        </Grid>
        <Grid>
          <Button
            style={{
              background: "white",
              padding: "0.5em 1.5em",
              borderRadius: "10px",
            }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
      <Grid container style={{ width: "100%" }} alignItems="stretch">
        <Grid item sm={8} className={classes.leftContainer}>
          <Grid container className={classes.container}>
            {/* EVENT NAME FIELD */}
            <Grid item sm={12} container>
              <TextField
                fullWidth
                className={classes.textInput}
                id="name"
                label={"Event Name"}
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>

            {/* EVENT TYPE FIELD */}
            <Grid container item sm={12} spacing={3}>
              <Grid
                item
                sm={6}
                style={{ width: "100%", marginBottom: "0.5em" }}
              >
                <FormLabel>Event Type</FormLabel>
                <Select
                  displayEmpty
                  variant="outlined"
                  id="type"
                  value={formik.values.type}
                  onChange={handleEventTypeChange}
                  style={{ width: "100%", marginTop: "0.5em" }}
                  error={formik.touched.type && Boolean(formik.errors.type)}
                >
                  <MenuItem value={""}>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={EVENT_TYPES.ONE_ON_ONE}>
                    {"One on One"}
                  </MenuItem>
                  <MenuItem value={EVENT_TYPES.ONE_TIME}>{"One time"}</MenuItem>
                </Select>
                <FormHelperText
                  error={formik.touched.type && Boolean(formik.errors.type)}
                >
                  {formik.touched.type && formik.errors.type}
                </FormHelperText>
              </Grid>
              <Grid item sm={6}>
                <Typography className={globalClasses.bold500}>
                  {formik.values.type
                    .toLocaleUpperCase()
                    .split("_")
                    .toString()
                    .replaceAll(",", " ") || "Please select an event"}
                </Typography>
                <Typography>
                  {getEventTypeDescription(formik.values.type)}
                </Typography>
              </Grid>
            </Grid>

            {/* EVENT DATES */}
            <Grid item sm={12} container style={{ width: "100%" }} spacing={1}>
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
                      helperText={
                        formik.touched.endDate && formik.errors.endDate
                      }
                      error={
                        formik.touched.endDate && Boolean(formik.errors.endDate)
                      }
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
                      helperText={
                        formik.touched.endDate && formik.errors.endDate
                      }
                      error={
                        formik.touched.endDate && Boolean(formik.errors.endDate)
                      }
                    />
                  </Grid>
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>

            {/* LOCATION AND CATEGORY */}
            <Grid item sm={12}>
              <Grid container spacing={3}>
                {/* LOCATION */}
                <Grid item sm={6} style={{ width: "100%" }}>
                  <TextField
                    fullWidth
                    className={classes.textInput}
                    id="location"
                    label={"Location"}
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.location}
                    error={
                      formik.touched.location && Boolean(formik.errors.location)
                    }
                    helperText={
                      formik.touched.location && formik.errors.location
                    }
                  />
                </Grid>

                {/* CATEGORY */}
                <Grid item sm={6} style={{ width: "100%" }}>
                  <TextField
                    fullWidth
                    className={classes.textInput}
                    id="category"
                    label={"Category"}
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.category}
                    error={
                      formik.touched.category && Boolean(formik.errors.category)
                    }
                    helperText={
                      formik.touched.category && formik.errors.category
                    }
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* EVENT ADDRESS FIELD */}
            <Grid item sm={12} container>
              <TextField
                fullWidth
                className={classes.textInput}
                id="address"
                label={"Event Address"}
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>

            {/* EVENT DESCRIPTION FIELD */}
            <Grid item sm={12} style={{ width: "100%" }}>
              <TextField
                multiline
                fullWidth
                className={classes.textInput}
                id="description"
                label={"Event description"}
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
                rows={4}
              />
            </Grid>

            {/* EVENT MODE AND TICKET PRICE */}
            <Grid item sm={12} container>
              {/* EVENT MODE */}
              <Grid item sm={6}>
                <FormControl variant="outlined" style={{ width: "100%" }}>
                  <FormLabel component="legend">{"Event Mode"}</FormLabel>
                  <RadioGroup
                    row
                    id="mode"
                    name="Event Mode"
                    value={formik.values.mode}
                    onChange={handleEventMode}
                  >
                    <FormControlLabel
                      value={EVENT_MODES.ONLINE}
                      control={<Radio />}
                      label="Online"
                    />
                    <FormControlLabel
                      value={EVENT_MODES.OFFLINE}
                      control={<Radio />}
                      label="Offline"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              {/* PRICE */}
              <Grid item sm={6}>
                <TextField
                  type="number"
                  fullWidth
                  className={classes.textInput}
                  id="price"
                  label={"Ticket Price"}
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.price}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sm={4} className={classes.rightContainer}>
          <Grid className={`${classes.container} ${classes.containerSave}`}>
            <FormControl variant="outlined">
              <FormLabel>Upload Event Cover Photo</FormLabel>
              <img src={"../assets/event.jpg"} style={{ width: "100%" }}></img>
            </FormControl>

            <TextField
              fullWidth
              className={classes.textInput}
              id="totalTickets"
              type="number"
              label={"Number of tickets"}
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.totalTickets}
              error={
                formik.touched.totalTickets &&
                Boolean(formik.errors.totalTickets)
              }
              helperText={
                formik.touched.totalTickets && formik.errors.totalTickets
              }
            />

            <TextField
              fullWidth
              className={classes.textInput}
              id="link"
              label={"Event Link"}
              variant="outlined"
              onChange={formik.handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">payorb/</InputAdornment>
                ),
              }}
              onBlur={formik.handleBlur}
              value={formik.values.link}
              error={formik.touched.link && Boolean(formik.errors.link)}
              helperText={formik.touched.link && formik.errors.link}
            />

            <ButtonCapsule
              buttonStyle={classes.saveButton}
              type={"submit"}
              text={"Save & Live"}
            ></ButtonCapsule>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

export default VendorEventCreationForm;
