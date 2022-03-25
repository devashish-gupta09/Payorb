import DateFnsUtils from "@date-io/date-fns";
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
  useMediaQuery,
  useTheme,
  Switch,
  DialogContentText,
} from "@material-ui/core";
import { CheckCircle } from "@material-ui/icons";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

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
import { getUser } from "../../services/auth";
import { createEvent, editEvent, getEventsPublic } from "../../services/events";
import { getVendorTrialClassQuota } from "../../services/vendor";
import { delay } from "../../utils/dateTime";
import { isEventPastDate } from "../../utils/events";
import firebase from "../../utils/firebase";
import { removeStringAndAddSeperator } from "../../utils/strings";
import { buildVendorDashboardUrl, getVendorIdFromUrl } from "../../utils/url";
import { createEventValidationSchema } from "../../validations/events";
import { FirebaseAuth } from "../AuthenticationContext";
import ButtonCapsule from "../ButtonCapsule";
import ImageEventUpload from "../ImageEventUpload";
import OneOnOneDateSelector from "../OneOnOneDateSelector";
import OneTimeDateSelector from "../OneTimeDateSelector";
import PageTitle from "../PageTitle";
import PostEventCreationDialog from "../PostEventCreationDialog";
import {
  getRandomEventBanner,
  VendorEventBannerHeader,
} from "../VendorEventBannerHeader";
import { EventCategoryField } from "./EventCategoryField";
import { styles } from "./styles";

const hash = createHash("sha256");
hash.update(v4());

function getCreationFormInitialState(trialClass) {
  return {
    name: "",
    location: "",
    category: EVENT_CATEGORY.EDUCATION,
    address: "",
    description: "",
    privateMessage: "",
    price: 0,
    mode: EVENT_MODES.ONLINE,
    totalTickets: 0,
    link: hash.digest("hex").substr(0, 6),
    url: hash.digest("hex").substr(0, 6),
    type: "",
    startDate: new Date(new Date().getTime() + 60 * 60000),
    endDate: new Date(new Date().getTime() + 120 * 60000),
    slotDuration: 0,
    slotStartTimePerDay: new Date(new Date().getTime() + 60 * 60000),
    slotEndTimePerDay: new Date(new Date().getTime() + 120 * 60000),
    otherField: "",
    earlyBird: false,
    earlyBirdPrice: 0,
    earlyBirdDeadline: new Date(new Date().getHours() + 1),
    trialClass: trialClass === true ? true : false,
    bannerImgUrl: getRandomEventBanner(),
  };
}

function getEventTypeDescription(type) {
  if (type !== "") {
    return EVENT_DESCRIPTION[type];
  }
  return "";
}

function VendorEventCreationForm({
  event,
  edit,
  clone,
  handleClose,
  trialClass,
}) {
  const classes = styles();
  const router = useRouter();
  const [dialog, setDialog] = React.useState({ display: false, text: "" });
  const [dateError, setDateError] = React.useState(null);
  const [postEventDialog, setPostEventDialog] = React.useState(false);
  const [descriptionRows, setDescriptionRows] = React.useState(3);
  const [customMessageRows, setCustomMessageRows] = React.useState(3);
  const [croppedImg, setCroppedImage] = React.useState();
  const theme = useTheme();
  const [eventsLoading, setEventsLoading] = React.useState(false);
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const { Alert, showAlert } = useAlertSnackbar();
  const [loader, setLoader] = React.useState(false);
  const [trialClassQuotaExhausted, setTrialClassQuotaExhausted] =
    React.useState(true);
  const [trialErrorModalOpen, setTrialErrorModalOpen] = React.useState(false);
  const handlePostCreationDialogClose = () => {
    router.push(buildVendorDashboardUrl(getVendorIdFromUrl(router), "/events"));
    handleCancel();
  };

  const isUrlvalid = async (link, vendorId) => {
    if (edit) return;
    setEventsLoading(true);
    getEventsPublic({ link, vendorId })
      .then(async (res) => {
        if (res.data.event) {
          setEventsLoading(false);
          formik.setFieldError("url", "Url is already in use");
        }
      })
      .catch((err) => {
        setEventsLoading(false);
        formik.setFieldError("url", "");
        console.log("Error", err);
      });
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
    initialValues: event || getCreationFormInitialState(trialClass),
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
          if (!req.privateMessage || req.privateMessage.length === 0) {
            delete req.privateMessage;
          }

          setLoader(true);
          delete req["otherField"];
          if (!edit) {
            // Lets upload image

            const formatedLink = removeStringAndAddSeperator(values.url, "-");
            formik.setFieldValue("link", formatedLink);

            let url;
            if (croppedImg) {
              url = await handleImageUpload(req.link);
            }

            await createEvent({
              event: { ...req, photoUrl: url, url: formatedLink },
            });

            setLoader(false);
            setPostEventDialog(true);
          } else {
            let url = undefined;
            if (croppedImg) {
              url = await handleImageUpload(req.link);
            }

            delete req.revenue;

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

  React.useEffect(() => {
    const auth = FirebaseAuth.Singleton();
    const user = auth.getUser();
    getUser({ vendorId: user.uid })
      .then((res) => {
        if (res) {
          isUrlvalid(formik.values.url, res.data.vendor.username);
        } else {
          throw new Error("Error fetching vendor");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [formik.values.url]);

  React.useEffect(() => {
    if (new Date(formik.values.slotStartTimePerDay) < new Date()) {
      setDateError("Time cannot be less than current time");
    } else {
      setDateError(null);
    }
    formik.setFieldValue(
      "slotEndTimePerDay",
      new Date(
        new Date(formik.values.slotStartTimePerDay).getTime() + 60 * 60000
      )
    );
  }, [formik.values.slotStartTimePerDay]);

  React.useEffect(() => {
    formik.setFieldValue(
      "slotEndTimePerDay",
      new Date(
        new Date(formik.values.slotStartTimePerDay).getTime() +
          formik.values.slotDuration * 60 * 60000
      )
    );
    console.log(
      new Date(
        new Date(formik.values.slotStartTimePerDay).getTime() +
          formik.values.slotDuration * 60 * 60000
      )
    );
  }, [formik.values.slotDuration]);

  React.useEffect(() => {
    if (new Date(formik.values.startDate) < new Date()) {
      setDateError("Time cannot be less than current time");
    } else {
      setDateError(null);
    }
  }, [formik.values.startDate]);

  React.useEffect(() => {
    if (new Date(formik.values.endDate) < new Date(formik.values.startDate)) {
      formik.setFieldValue(
        "endDate",
        new Date(new Date(formik.values.startDate).getTime() + 60 * 60000)
      );
    }
  }, [formik.values.startDate, formik.values.endDate]);

  const fetchVendorTrialClassQuota = async (startDate) => {
    await getVendorTrialClassQuota(startDate)
      .then((res) => {
        if (res.data) {
          if (res.data.trialClassQuota === true) {
            setTrialErrorModalOpen(true);
          }
          setTrialClassQuotaExhausted(res.data.trialClassQuota);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  React.useEffect(() => {
    fetchVendorTrialClassQuota(formik.values.startDate);
  }, [formik.values.startDate]);

  React.useEffect(() => {
    if (formik.values.trialClass === true) {
      formik.setFieldValue("price", 0);
    }
  }, [formik.values.trialClass]);

  React.useEffect(() => {
    if (!edit && trialClass && trialClassQuotaExhausted) {
      formik.setFieldValue("trialClass", false);
    } else if (!edit && trialClass && !trialClassQuotaExhausted) {
      formik.setFieldValue("trialClass", true);
    }
  }, [trialClassQuotaExhausted]);

  React.useEffect(() => {
    let toAddDescription =
      formik.values.description.split("\n").length > 3
        ? formik.values.description.split("\n").length - 3
        : 0;
    let toAddMessage = formik.values.privateMessage
      ? formik.values.privateMessage.split("\n").length > 3
        ? formik.values.privateMessage.split("\n").length - 3
        : 0
      : 0;
    if (toAddDescription <= 7) {
      setDescriptionRows(3 + toAddDescription);
    }
    if (toAddMessage <= 7) {
      setCustomMessageRows(3 + toAddMessage);
    }
  }, [formik.values.description, formik.values.privateMessage]);

  const handleEarlyBirdDeadlineChange = (date) => {
    formik.setFieldValue("earlyBirdDeadline", date.toISOString());
  };

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
    if (edit || clone) {
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
    } else if (edit && formik.values.trialClass) {
      return true;
    }
  };

  const handleSlotDurationChange = (event) => {
    const hours = parseFloat(parseFloat(event.target.value).toFixed(1));
    formik.setFieldValue("slotDuration", hours);
  };

  React.useEffect(() => {
    if (event && clone && !edit) {
      formik.setFieldValue(
        "url",
        isEventPastDate(event.endDate) && event.url
          ? event.url
          : hash.digest("hex").substr(0, 6)
      );
      formik.setFieldValue("link", hash.digest("hex").substr(0, 6));
      formik.setFieldValue("orders", undefined);
      formik.setFieldValue("bookedSlots", undefined);
      formik.setFieldValue("customers", undefined);
      formik.setFieldValue("reviews", undefined);
      formik.setFieldValue("revenue", undefined);
      formik.setFieldValue("createdDate", undefined);
      formik.setFieldValue("userUID", undefined);
      formik.setFieldValue("status", undefined);
      formik.setFieldValue("updatedAt", undefined);
      formik.setFieldValue("vendorUserName", undefined);
      formik.setFieldValue("price", parseInt(event.price));
      formik.setFieldValue("earlyBirdPrice", parseInt(event.earlyBirdPrice));
    }
  }, [event, clone]);

  React.useEffect(() => {
    if (edit) {
      formik.setFieldValue("vendorUserName", undefined);
    }
  }, [edit]);

  return (
    <div style={{ position: "relative", width: "99vw" }}>
      <Grid
        style={{
          background:
            "linear-gradient(to right, rgba(238, 238, 238, 1), rgba(112, 112, 112, 1))",
        }}
      >
        <div
          style={{
            background: "url(/assets/create-event-transparent-bg.svg)",
            // padding: "0 8% 6% 8%",
          }}
        >
          <VendorEventBannerHeader isVendor={true} eventData={formik.values} />
        </div>
      </Grid>

      <Grid
        style={{
          height: "100vh",
          width: "100%",
          background: "url(/assets/create-event-bg.svg)",
          // backgroundSize: "",
          backgroundRepeat: "repeat",
        }}
      ></Grid>

      <Grid style={{ position: "absolute", top: "18%" }}>
        <PageTitle title="Payorb | Create Event" />
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
            style={{ width: "100%", padding: "0 8%" }}
            alignItems="flex-start"
          >
            <Grid item sm={8} className={classes.leftContainer}>
              <Grid
                container
                className={classes.container}
                alignItems="stretch"
                spacing="2"
              >
                <Grid
                  container
                  justify="space-between"
                  alignItems="center"
                  className={classes.titleContainer}
                >
                  {edit ? (
                    <Typography
                      className={`${globalStyles.bold} ${classes.editTitle}`}
                      variant={"h5"}
                    >
                      Edit Event
                    </Typography>
                  ) : clone ? (
                    <Grid>
                      <Typography
                        className={`${globalStyles.bold}`}
                        variant={"h5"}
                      >
                        Clone Event
                      </Typography>
                    </Grid>
                  ) : (
                    <Grid>
                      <Typography
                        className={`${globalStyles.boldSixHundred}`}
                        variant={"h5"}
                      >
                        Create Event
                      </Typography>
                    </Grid>
                  )}
                </Grid>

                {/* EVENT NAME FIELD */}
                <Grid item sm={12} container>
                  <TextField
                    fullWidth
                    className={classes.textInput}
                    id="name"
                    label={"Event Name"}
                    variant="filled"
                    InputProps={{
                      style: { background: "#ECEDF4", borderRadius: "4px" },
                      disableUnderline: true,
                    }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>

                {trialClass || formik.values.trialClass ? (
                  trialClassQuotaExhausted && !formik.values.trialClass ? (
                    <Dialog
                      open={trialClassQuotaExhausted && trialErrorModalOpen}
                      onClose={() => setTrialErrorModalOpen(false)}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogContent>
                        <DialogContentText
                          id="alert-dialog-description"
                          style={{ padding: "2em", fontWeight: "bold" }}
                        >
                          You have utilized your trial class quota for the
                          month. Please change Start Date to create a new trial
                          class for the next month.
                        </DialogContentText>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <Grid item sm={12}>
                      <FormControlLabel
                        control={
                          <Switch
                            id="trialClass"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            checked={formik.values.trialClass}
                            error={
                              formik.touched.trialClass &&
                              Boolean(formik.errors.trialClass)
                            }
                            helperText={
                              formik.touched.trialClass &&
                              formik.errors.trialClass
                            }
                            disabled={edit}
                          />
                        }
                        label={"Trial Class"}
                      />
                    </Grid>
                  )
                ) : null}

                {/* EVENT TYPE AND CATEGORY FIELD */}
                <Grid item sm={6} style={{ width: "100%" }}>
                  <EventCategoryField
                    formik={formik}
                    checkDisabled={checkDisabled}
                  />
                </Grid>
                <Grid item sm={6} style={{ width: "100%" }}>
                  <EventTypeSelect
                    formik={formik}
                    checkDisabled={checkDisabled}
                    handleEventTypeChange={handleEventTypeChange}
                  />
                  <FormHelperText
                    error={formik.touched.type && Boolean(formik.errors.type)}
                  >
                    {formik.touched.type && formik.errors.type}
                  </FormHelperText>
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
                      edit={edit}
                    />
                  ) : (
                    <OneOnOneDateSelector
                      edit={edit}
                      formik={formik}
                      checkDisabled={checkDisabled}
                    />
                  )}
                </Grid>
                {/* EVENT DATES */}
                {/* <Grid item sm={12} container style={{ width: "100%" }}>
                <p style={{ color: "#ff0000" }}>{dateError}</p>
              </Grid> */}

                {/* <Grid item sm={12} container spacing={2}> */}

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
                    InputProps={{
                      style: { background: "#ECEDF4" },
                    }}
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                    rows={descriptionRows}
                  />
                </Grid>

                {/* PRIVATE MESSAGE FIELD */}
                <Grid item sm={12} style={{ width: "100%" }}>
                  <TextField
                    multiline
                    fullWidth
                    className={classes.textInput}
                    id="privateMessage"
                    label={"Message to Customers"}
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.privateMessage}
                    error={
                      formik.touched.privateMessage &&
                      Boolean(formik.errors.privateMessage)
                    }
                    rows={customMessageRows}
                    FormHelperTextProps={{ className: classes.helperText }}
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
                          label="Online Event"
                        />
                        <FormControlLabel
                          value={EVENT_MODES.OFFLINE}
                          control={<Radio />}
                          label="Offline Event"
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
                      error={
                        formik.touched.price && Boolean(formik.errors.price)
                      }
                      helperText={formik.touched.price && formik.errors.price}
                      disabled={formik.values.trialClass || checkDisabled()}
                    />
                  </Grid>
                </Grid>

                {/* ------------------------------------------------------------ */}

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
                      helperText={
                        formik.touched.address && formik.errors.address
                      }
                    />
                  </Grid>
                ) : null}

                {/* Early Bird */}

                <Grid item container sm={8} alignItems="center">
                  <b>Early Bird</b>
                  <Switch
                    id="earlyBird"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.earlyBird}
                    error={
                      formik.touched.earlyBird &&
                      Boolean(formik.errors.earlyBird)
                    }
                    helperText={
                      formik.touched.earlyBird && formik.errors.earlyBird
                    }
                    disabled={checkDisabled() || formik.values.trialClass}
                  />
                </Grid>
                <Grid item sm={4}>
                  {formik.values.earlyBird ? (
                    <TextField
                      type="number"
                      fullWidth
                      className={classes.textInput}
                      id="earlyBirdPrice"
                      label={"Early bird price"}
                      variant="outlined"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.earlyBirdPrice}
                      error={
                        formik.touched.earlyBirdPrice &&
                        Boolean(formik.errors.earlyBirdPrice)
                      }
                      helperText={
                        formik.touched.earlyBirdPrice &&
                        formik.errors.earlyBirdPrice
                      }
                    />
                  ) : null}
                </Grid>
                <Grid item sm={8}>
                  {formik.values.earlyBird ? (
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid
                        item
                        sm={12}
                        container
                        spacing={1}
                        alignItems="center"
                      >
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
                            id="earlyBirdEndDate"
                            label="Offer End Date"
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
                              style: {
                                padding: 0,
                              },
                            }}
                            inputVariant="outlined"
                            margin="normal"
                            id="time-picker"
                            label="Offer End Time"
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
            </Grid>

            <Grid item sm={4} className={classes.rightContainer}>
              <Grid className={`${classes.container} ${classes.containerSave}`}>
                <FormControl variant="outlined">
                  <FormLabel>
                    <Typography variant="h6" style={{ fontWeight: "bold" }}>
                      Event Cover
                    </Typography>
                  </FormLabel>

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
                  <FormControl style={{ width: "100%", marginBottom: "1em" }}>
                    <FormLabel style={{ paddingBottom: "0.5em" }}>
                      Number of Tickets
                    </FormLabel>
                    <TextField
                      fullWidth
                      className={classes.textInput}
                      id="totalTickets"
                      type="number"
                      variant="filled"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.totalTickets}
                      error={
                        formik.touched.totalTickets &&
                        Boolean(formik.errors.totalTickets)
                      }
                      helperText={
                        formik.touched.totalTickets &&
                        formik.errors.totalTickets
                      }
                      disabled={checkDisabled()}
                    />
                  </FormControl>
                )}

                <FormControl style={{ width: "100%", marginBottom: "1em" }}>
                  <FormLabel style={{ paddingBottom: "0.5em" }}>
                    Event Link
                  </FormLabel>
                  <TextField
                    fullWidth
                    className={classes.textInput}
                    id="url"
                    variant="filled"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.url}
                    error={formik.touched.url && Boolean(formik.errors.url)}
                    helperText={
                      formik.errors.url
                        ? formik.errors.url
                        : edit
                        ? ""
                        : "You can also personalize your event link, e.g. YogaWithNeha, CookieBakingWorkshop"
                    }
                    FormHelperTextProps={{ className: classes.helperText }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          payorb/
                        </InputAdornment>
                      ),
                    }}
                    disabled={edit}
                  />
                </FormControl>

                <ButtonCapsule
                  disabled={loader || dateError || formik.errors.url}
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
    </div>
  );
}

const EventTypeSelectSender = ({ value }) => {
  switch (value) {
    case EVENT_TYPES.ONE_ON_ONE:
      return <Typography>One On One</Typography>;
    case EVENT_TYPES.ONE_TIME:
      return <Typography>One Time</Typography>;
    default:
      return "Event Type";
  }
};

const EventTypeSelect = ({ formik, checkDisabled, handleEventTypeChange }) => {
  return (
    <>
      <Select
        displayEmpty
        variant="outlined"
        id="type"
        value={formik.values.type}
        onChange={handleEventTypeChange}
        style={{
          width: "100%",
          marginTop: "0.5em",
          background: "#ECEDF4",
          "&:hover": {
            background: "pink",
          },
        }}
        error={formik.touched.type && Boolean(formik.errors.type)}
        disabled={checkDisabled()}
        renderValue={() => <EventTypeSelectSender value={formik.values.type} />}
      >
        <MenuItem value={""}>None</MenuItem>
        <MenuItem value={EVENT_TYPES.ONE_TIME}>
          <Grid
            container
            style={
              formik.values.type === EVENT_TYPES.ONE_TIME
                ? {
                    padding: "0.5em",
                  }
                : { padding: "0.5em 0.5em 0.5em 2em" }
            }
          >
            {formik.values.type === EVENT_TYPES.ONE_TIME && (
              <Grid item>
                <CheckCircle
                  style={{ color: "#0061FE", marginRight: "0.35em" }}
                />
              </Grid>
            )}

            <Grid item>
              <Typography>One Time</Typography>
              <Typography>
                Fixed schedule of event / service. <br></br>Open to one or more
                clients.
              </Typography>
            </Grid>
          </Grid>
        </MenuItem>
        <MenuItem value={EVENT_TYPES.ONE_ON_ONE}>
          <Grid
            container
            style={
              formik.values.type === EVENT_TYPES.ONE_ON_ONE
                ? {
                    padding: "0.5em",
                  }
                : { padding: "0.5em 0.5em 0.5em 2em" }
            }
          >
            {formik.values.type === EVENT_TYPES.ONE_ON_ONE && (
              <Grid item>
                <CheckCircle
                  style={{ color: "#0061FE", marginRight: "0.35em" }}
                />
              </Grid>
            )}

            <Grid>
              <Typography>One on One</Typography>
              <Typography>
                Clients can book individual service
                <br /> sessions with you from calender <br />
                availability
              </Typography>
            </Grid>
          </Grid>
        </MenuItem>
      </Select>
    </>
  );
};

export default VendorEventCreationForm;
