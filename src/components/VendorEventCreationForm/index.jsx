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
  Dialog,
  DialogContent,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

import createHash from "create-hash";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React from "react";

import { v4 } from "uuid";

import { globalStyles } from "../../../styles/globalStyles";
import {
  EVENT_CATEGORY,
  EVENT_DESCRIPTION,
  EVENT_MODES,
  EVENT_TYPES,
} from "../../constants/events";

import { PAGE_PATHS } from "../../constants/paths";
import { createEvent, editEvent } from "../../services/events";
import { getDateForTime } from "../../utils/dateTime";
import { createEventValidationSchema } from "../../validations/events";
import ButtonCapsule from "../ButtonCapsule";
import OneOnOneDateSelector from "../OneOnOneDateSelector";
import OneTimeDateSelector from "../OneTimeDateSelector";

import PostEventCreationDialog from "../PostEventCreationDialog";
import EventCategoryField from "./EventCategoryField";
import { styles } from "./styles";

const hash = createHash("sha256");
hash.update(v4());

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
    link: hash.digest("hex").substr(0, 6),
    type: "",
    startDate: new Date().toISOString(),
    endDate: getDateForTime(new Date().getHours() + 1),
    slotDuration: 0,
    slotStartTimePerDay: getDateForTime(9),
    slotEndTimePerDay: getDateForTime(17),
    otherField: "",
  };
}

function getEventTypeDescription(type) {
  if (type !== "") {
    return EVENT_DESCRIPTION[type];
  }
  return "";
}

function getTimeAfter(hours) {
  const cleandUpHours = parseFloat(hours.toFixed(1));
  const currTime = new Date();
  currTime.setHours(currTime.getHours() + cleandUpHours + 1);
  return currTime;
}

function VendorEventCreationForm({ event, edit, handleClose }) {
  const classes = styles();
  const globalClasses = globalStyles();
  const router = useRouter();
  const [dialog, setDialog] = React.useState({ display: false, text: "" });
  const [postEventDialog, setPostEventDialog] = React.useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const handlePostCreationDialogClose = () => {
    router.push(PAGE_PATHS.VENDOR_DASHBOARD_EVENTS);
  };

  const handleEventTypeChange = (event) => {
    formik.setFieldValue("type", event.target.value);
  };

  const handleEventMode = (event) => {
    formik.setFieldValue("mode", event.target.value);
  };

  const formik = useFormik({
    initialValues: event || getCreationFormInitialState(),
    validationSchema: createEventValidationSchema,
    validateOnBlur: true,
    onSubmit: async (values) => {
      if (values) {
        try {
          const req = {
            ...values,
            category: values.otherField || values.category,
          };

          delete req["otherField"];
          if (!edit) {
            await createEvent({
              event: req,
            });
            setPostEventDialog(true);
          } else {
            await editEvent({
              event: req,
            });
            router.reload();
          }
        } catch (err) {
          console.log(err);
          setDialog({ display: true, text: err.error });
        }
      }
    },
  });

  const handleCancel = () => {
    if (edit) {
      handleClose();
    } else {
      router.push(PAGE_PATHS.VENDOR_DASHBOARD_EVENTS);
    }
  };

  const handleDialogClose = React.useCallback(() => {
    setDialog({ display: false, text: "" });
  }, []);

  const checkDisabled = () => {
    if (edit && event?.orders && event?.orders?.length > 0) {
      return true;
    }
  };

  const handleSlotDurationChange = (event) => {
    const hours = parseFloat(parseFloat(event.target.value).toFixed(1));
    formik.setFieldValue("slotDuration", hours);
  };

  return (
    <Grid style={{ width: "100%" }}>
      <PostEventCreationDialog
        event={formik.values}
        open={postEventDialog}
        onClose={handlePostCreationDialogClose}
      />
      <form onSubmit={formik.handleSubmit}>
        <Dialog open={dialog.display} onClose={handleDialogClose}>
          <DialogContent className={classes.modal}>
            <Typography>{dialog.text}</Typography>
          </DialogContent>
        </Dialog>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className={classes.titleContainer}
        >
          {edit ? (
            <Typography
              className={`${globalStyles.bold} ${classes.editTitle}`}
              variant={"h3"}
            >
              Edit Event
            </Typography>
          ) : (
            <Grid>
              <Typography className={`${globalStyles.bold}`} variant={"h3"}>
                Create Event
              </Typography>
            </Grid>
          )}
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
              <Grid container item sm={12} spacing={3} alignItems="center">
                <Grid
                  item
                  sm={7}
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
                    disabled={checkDisabled()}
                  >
                    <MenuItem value={""}>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={EVENT_TYPES.ONE_ON_ONE}>
                      {"One on One"}
                    </MenuItem>
                    <MenuItem value={EVENT_TYPES.ONE_TIME}>
                      {"One time"}
                    </MenuItem>
                  </Select>
                  <FormHelperText
                    error={formik.touched.type && Boolean(formik.errors.type)}
                  >
                    {formik.touched.type && formik.errors.type}
                  </FormHelperText>

                  {formik.values.type === EVENT_TYPES.ONE_ON_ONE && (
                    <Grid>
                      <Tooltip
                        title={
                          "Please choose a valid slot duration for your event. [Eg: 1, 2, 1.5 etc]. Clients would be able book these slots."
                        }
                      >
                        <TextField
                          fullWidth
                          className={classes.textInput}
                          type="number"
                          id="slotDuration"
                          label={"Slot duration (in hrs)"}
                          variant="outlined"
                          onChange={handleSlotDurationChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.slotDuration}
                          error={
                            formik.touched.slotDuration &&
                            Boolean(formik.errors.slotDuration)
                          }
                          helperText={
                            formik.touched.slotDuration &&
                            formik.errors.slotDuration
                          }
                        />
                      </Tooltip>
                    </Grid>
                  )}
                </Grid>
                <Grid item sm={5}>
                  <Typography className={globalClasses.bold500} gutterBottom>
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
              <Grid
                item
                sm={12}
                container
                style={{ width: "100%" }}
                spacing={1}
              >
                {formik.values.type === EVENT_TYPES.ONE_TIME ? (
                  <OneTimeDateSelector
                    formik={formik}
                    checkDisabled={checkDisabled}
                  />
                ) : (
                  <OneOnOneDateSelector
                    formik={formik}
                    checkDisabled={checkDisabled}
                  />
                )}
              </Grid>

              {/* LOCATION AND CATEGORY */}
              <Grid item sm={12}>
                <Grid container spacing={3} alignItems="flex-start">
                  {/* CATEGORY */}
                  <Grid item sm={6} style={{ width: "100%" }}>
                    <EventCategoryField
                      formik={formik}
                      checkDisabled={checkDisabled}
                    />
                  </Grid>
                  {/* LOCATION */}
                  <Grid item sm={6} style={{ width: "100%" }}>
                    <FormLabel>Location</FormLabel>

                    <TextField
                      fullWidth
                      className={classes.textInput}
                      id="location"
                      variant="outlined"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.location}
                      error={
                        formik.touched.location &&
                        Boolean(formik.errors.location)
                      }
                      helperText={
                        formik.touched.location && formik.errors.location
                      }
                      disabled={checkDisabled()}
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
                  error={
                    formik.touched.address && Boolean(formik.errors.address)
                  }
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
                      disabled={checkDisabled()}
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
                    disabled={checkDisabled()}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item sm={4} className={classes.rightContainer}>
            <Grid className={`${classes.container} ${classes.containerSave}`}>
              <FormControl variant="outlined">
                <FormLabel>Upload Event Cover Photo</FormLabel>
                <img
                  src={
                    "https://i.pinimg.com/736x/59/59/88/5959880ca0cb6b30926091b7bc251812.jpg"
                  }
                  style={{ width: "100%", padding: "2em 0" }}
                ></img>
              </FormControl>

              {formik.values.type !== EVENT_TYPES.ONE_ON_ONE && (
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
                  disabled={checkDisabled()}
                />
              )}

              <TextField
                fullWidth
                className={classes.textInput}
                id="link"
                label={"Event Link"}
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.link}
                error={formik.touched.link && Boolean(formik.errors.link)}
                helperText={formik.touched.link && formik.errors.link}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">payorb/</InputAdornment>
                  ),
                }}
                disabled={edit}
              />

              <ButtonCapsule
                buttonStyle={classes.saveButton}
                type={"submit"}
                text={"Save & Live"}
              ></ButtonCapsule>

              {matches && (
                <Button fullWidth onClick={handleCancel}>
                  Cancel
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

export default VendorEventCreationForm;
