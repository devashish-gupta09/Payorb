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
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";

import { v4 } from "uuid";

import { globalStyles } from "../../../styles/globalStyles";
import { ALERT_TYPES } from "../../constants/alerts";
import {
  EVENT_CATEGORY,
  EVENT_DESCRIPTION,
  EVENT_MODES,
  EVENT_TYPES,
} from "../../constants/events";
import { DEFAULT_EVENT_IMAGE } from "../../constants/images";

import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import { createEvent, editEvent } from "../../services/events";
import { delay, getDateForTime } from "../../utils/dateTime";
import firebase from "../../utils/firebase";
import { removeStringAndAddSeperator } from "../../utils/strings";
import { buildVendorDashboardUrl, getVendorIdFromUrl } from "../../utils/url";
import { createEventValidationSchema } from "../../validations/events";
import { FirebaseAuth } from "../AuthenticationContext";
import ButtonCapsule from "../ButtonCapsule";
import ImageEventUpload from "../ImageEventUpload";
import OneOnOneDateSelector from "../OneOnOneDateSelector";
import OneTimeDateSelector from "../OneTimeDateSelector";

import PostEventCreationDialog from "../PostEventCreationDialog";
import { EventCategoryField } from "./EventCategoryField";
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
    startDate: getDateForTime(new Date().getHours()),
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

function VendorEventCreationForm({ event, edit, handleClose }) {
  const classes = styles();
  const globalClasses = globalStyles();
  const router = useRouter();
  const [dialog, setDialog] = React.useState({ display: false, text: "" });
  const [postEventDialog, setPostEventDialog] = React.useState(false);
  const [croppedImg, setCroppedImage] = React.useState();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const { Alert, showAlert } = useAlertSnackbar();
  const [loader, setLoader] = React.useState(false);

  const handlePostCreationDialogClose = () => {
    router.push(buildVendorDashboardUrl(getVendorIdFromUrl(router), "/events"));
  };

  const handleEventTypeChange = (event) => {
    formik.setFieldValue("type", event.target.value);
  };

  const handleEventMode = (event) => {
    formik.setFieldValue("mode", event.target.value);
  };

  const handleCroppedImage = React.useCallback((data) => {
    setCroppedImage(data);
  }, []);

  const formik = useFormik({
    initialValues: event || getCreationFormInitialState(),
    validationSchema: createEventValidationSchema,
    validateOnBlur: true,
    onSubmit: async (values) => {
      if (values) {
        try {
          if (values.type === EVENT_TYPES.ONE_ON_ONE) {
            const momentEndDate = moment(values.endDate);
            const momentSlotEndDate = moment(values.slotEndTimePerDay);

            momentEndDate
              .set("hour", momentSlotEndDate.get("hour"))
              .set("minutes", momentSlotEndDate.get("minutes"))
              .set("second", momentSlotEndDate.get("second"));

            values.endDate = momentEndDate.toISOString();

            const momentStartDate = moment(values.startDate);
            const momentSlotStartDate = moment(values.slotStartTimePerDay);

            momentStartDate
              .set("hour", momentSlotStartDate.get("hour"))
              .set("minutes", momentSlotStartDate.get("minutes"))
              .set("second", momentSlotStartDate.get("second"));

            values.startDate = momentStartDate.toISOString();
          }

          const req = {
            ...values,
            category: values.otherField || values.category,
          };

          setLoader(true);
          delete req["otherField"];
          if (!edit) {
            // Lets upload image

            const formatedLink = removeStringAndAddSeperator(values.link, "-");
            formik.setFieldValue("link", formatedLink);

            let url;
            if (croppedImg) {
              url = await handleImageUpload(req.link);
            }

            await createEvent({
              event: { ...req, photoUrl: url, link: formatedLink },
            });

            setLoader(false);
            setPostEventDialog(true);
          } else {
            let url = undefined;
            if (croppedImg) {
              url = await handleImageUpload(req.link);
            }

            await editEvent({
              event: { ...req, photoUrl: url },
            });

            setLoader(false);
            showAlert("Event Updated");
            await delay(1000);
            router.reload();
          }
        } catch (err) {
          if (err?.errors?.length > 0) {
            setLoader(false);

            if (Object.keys(err.errors[0]).length) {
              backendValidation(err.errors[0]);
              return;
            } else {
              showAlert(err.error, ALERT_TYPES.ERROR);
              return;
            }
          } else if (err.error) {
            showAlert(err.error), ALERT_TYPES.ERROR;
          } else {
            showAlert(err.message, ALERT_TYPES.ERROR);
          }
        }

        setLoader(false);
      }
    },
  });

  const handleImageUpload = React.useCallback(
    async (link) => {
      const type = croppedImg.substring(
        croppedImg.indexOf(":") + 1,
        croppedImg.indexOf(";")
      );

      const auth = FirebaseAuth.Singleton();
      const user = auth.getUser();

      const ref = firebase.storage().ref();
      const childRef = ref.child(
        `/events/${user.uid}-${link}.${type.split("/")[1]}`
      );

      try {
        await childRef.putString(croppedImg, "data_url", {
          cacheControl: "max-age=9999999999",
          customMetadata: {
            "Access-Control-Allow-Origin": "*",
          },
        });

        return await childRef.getDownloadURL();
      } catch (err) {
        // Don't do anything if an image upload is unsuccessful
        console.log("Error", err);
        throw err;
      }
    },
    [croppedImg]
  );

  const backendValidation = React.useCallback((err) => {
    formik.setFieldError(err.details[0].context.key, err.details[0].message);
  }, []);

  const handleCancel = () => {
    if (edit) {
      handleClose();
    } else {
      router.push(
        buildVendorDashboardUrl(getVendorIdFromUrl(router), "/events")
      );
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
      {Alert()}
      <PostEventCreationDialog
        eventImg={croppedImg || formik.values.photoUrl}
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
                  {formik.values.mode !== EVENT_MODES.ONLINE ? (
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
                  ) : null}
                </Grid>
              </Grid>

              {/* EVENT ADDRESS FIELD */}
              {formik.values.mode !== EVENT_MODES.ONLINE ? (
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
              ) : null}

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

                <ImageEventUpload
                  croppedImg={croppedImg}
                  handleCroppedImage={handleCroppedImage}
                  imageProps={{
                    src: formik.values.photoUrl || DEFAULT_EVENT_IMAGE,
                    className: classes.eventImage,
                  }}
                />
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
                helperText={
                  formik.errors.link
                    ? formik.errors.link
                    : edit
                    ? ""
                    : "You can also personalize your event link, e.g. YogaWithNeha, CookieBakingWorkshop"
                }
                FormHelperTextProps={{ className: classes.helperText }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">payorb/</InputAdornment>
                  ),
                }}
                disabled={edit}
              />

              <ButtonCapsule
                disabled={loader}
                buttonStyle={classes.saveButton}
                type={"submit"}
                text={"Host Event"}
                showLoader={loader}
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
