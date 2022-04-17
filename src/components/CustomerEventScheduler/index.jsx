import DateFnsUtils from "@date-io/date-fns";
import {
  Button,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import clsx from "clsx";
import {
  endOfWeek,
  format,
  isSameDay,
  isWithinInterval,
  startOfWeek,
} from "date-fns";
import moment from "moment";

import { useRouter } from "next/router";
import React from "react";

import { EVENT_TYPES } from "../../constants/events";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import useFetchEvents from "../../hooks/useFetchEvents";
import PageTitle from "../PageTitle";
import SkeletonLoading from "../SkeletonLoading";
import { VendorEventBannerHeader } from "../VendorEventBannerHeader";
import { VendorPublicEvents } from "../VendorPublicEvents";

function generateOneOnOneEventSlots(event) {
  const result = {};
  const startDate = moment(new Date(event.startDate));
  const endDate = moment(new Date(event.endDate));
  const slotStartTime = moment(new Date(event.slotStartTimePerDay));
  const slotEndTime = moment(new Date(event.slotEndTimePerDay));

  startDate
    .set("hour", slotStartTime.get("hour"))
    .set("minute", slotStartTime.get("minute"))
    .set("second", slotStartTime.get("second"));

  endDate
    .set("hour", slotEndTime.get("hour"))
    .set("minute", slotEndTime.get("minute"))
    .set("second", slotEndTime.get("second"));

  for (
    var startTime = startDate;
    startTime <= endDate;
    startTime.add(event.slotDuration, "hour")
  ) {
    if (
      startTime.get("hour") >= slotStartTime.get("hour") &&
      startTime.get("hour") < slotEndTime.get("hour")
    ) {
      const endSlot = moment(startTime);
      endSlot.set("hour", event.slotDuration);

      if (!event.bookedSlots.includes(startTime.toISOString())) {
        if (result[startDate.format("YYYY-MM-DD")]) {
          result[startDate.format("YYYY-MM-DD")].push({
            title: event.name,
            startDate: startTime.toDate(),
            link: event.link,
            type: event.type,
          });
        } else {
          result[startDate.format("YYYY-MM-DD")] = [
            {
              title: event.name,
              startDate: startTime.toDate(),
              link: event.link,
              type: event.type,
            },
          ];
        }
      }
    }
  }

  return result;
}

// minDate and maxDate => Date objects
function CustomerCalenderDay({
  date,
  selectedDate,
  dayInCurrentMonth,
  minDate,
  maxDate,
}) {
  const classes = useStyles();
  console.log(date, selectedDate, dayInCurrentMonth, minDate, maxDate);
  // const minDateMoment = moment(minDate);
  // const maxDateMoment = moment(maxDate);

  const start = startOfWeek({ ...selectedDate });
  const end = endOfWeek({ ...selectedDate });

  const dayIsBetween = isWithinInterval({ ...date }, { start, end });
  const isFirstDay = isSameDay({ ...date }, start);
  const isLastDay = isSameDay({ ...date }, end);

  // const dayDiff = moment.duration(maxDateMoment.diff(minDateMoment)).asDays();

  const wrapperClassName = clsx({
    [classes.highlight]: dayIsBetween,
    [classes.firstHighlight]: isFirstDay,
    [classes.endHighlight]: isLastDay,
  });

  const dayClassName = clsx(classes.day, {
    [classes.nonCurrentMonthDay]: !dayInCurrentMonth,
    [classes.highlightNonCurrentMonthDay]: !dayInCurrentMonth && dayIsBetween,
  });

  return (
    <div className={wrapperClassName}>
      <IconButton className={dayClassName}>
        <span> {format({ ...date }, "d")} </span>
      </IconButton>
    </div>
  );
}

function CustomerEventScheduler({ eventLink, vendorId }) {
  const { events, loading, error } = useFetchEvents(false, {
    link: eventLink,
    vendorId,
  });
  const [week, setWeek] = React.useState();
  const { Alert, showAlert } = useAlertSnackbar();
  const [timeChosen, setTimeChosen] = React.useState({
    selected: false,
  });
  const router = useRouter();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();

  const handleTimeClick = (time) => {
    setTimeChosen({
      selected: true,
      time,
    });
  };

  if (loading) {
    return <SkeletonLoading message="Loading One On One event" />;
  }

  if (error) {
    return <h1>Error fetching event. Please contact support</h1>;
  }

  const handleChange = (data) => {
    setWeek(moment(new Date(data)));
  };

  const handleBookButton = (startTime, slotDuration) => {
    const momentStartTime = moment(startTime);
    if (!momentStartTime.toDate()) {
      showAlert("Please select a suitable time slot");
      return;
    }

    const endTime = moment(momentStartTime);
    endTime.add(slotDuration, "hours");
    router.push(
      `/${vendorId}/${eventLink}?from=${momentStartTime
        .toDate()
        .getTime()}&to=${endTime.toDate().getTime()}`
    );
  };

  if (events && Object.keys(events).length > 0) {
    const event = events[0];
    const startDate = week || moment(new Date(event.startDate));
    const calenderViewEvents = generateOneOnOneEventSlots(event);

    if (event.type === EVENT_TYPES.ONE_ON_ONE) {
      return (
        <Grid>
          <PageTitle title="Payorb | Event Booking" />
          {Alert()}
          {event.coverImgUrl && (
            <VendorEventBannerHeader eventData={event} isVendor={false} />
          )}

          <Grid className={classes.root}>
            <Grid className={classes.calenderContainer}>
              <Grid
                container
                style={{ width: "100%", padding: "1em 1em" }}
                justifyContent="flex-end"
              >
                <Button
                  onClick={() =>
                    handleBookButton(timeChosen.time, event.slotDuration)
                  }
                  className={classes.bookButton}
                  disabled={!timeChosen.selected}
                >
                  Book
                </Button>
              </Grid>
              <Grid container spacing={3}>
                <Grid item sm={12}>
                  <Typography
                    style={{
                      paddingLeft: "1em",
                      paddingTop: "1em",
                      fontSize: "1.2em",
                      fontWeight: "500",
                    }}
                  >
                    Select Date and Time
                  </Typography>
                </Grid>
                <Divider />
                <Grid item sm={5} style={{ width: "100%" }}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      value={startDate.toDate()}
                      variant="static"
                      openTo="date"
                      onChange={handleChange}
                      minDate={new Date(event.startDate)}
                      maxDate={new Date(event.endDate)}
                      disableToolbar
                      // renderDay={(date, selectedDate, dayInCurrentMonth) => (
                      //   <CustomerCalenderDay
                      //     date={date}
                      //     selectedDate={selectedDate}
                      //     minDate={new Date(event.startDate)}
                      //     maxDate={new Date(event.endDate)}
                      //     dayInCurrentMonth={dayInCurrentMonth}
                      //   />
                      // )}
                    />
                    {/* <Calendar
                      date={startDate.toDate()}
                      onChange={handleChange}
                      minDate={new Date(event.startDate)}
                      maxDate={new Date(event.endDate)}
                      renderDay={(day, selectedDate, x, dayComponent) => (
                        <CustomerCalenderDay
                          day={day}
                          selectedDate={selectedDate}
                          minDate={new Date(event.startDate)}
                          maxDate={new Date(event.endDate)}
                          dayComponent={dayComponent}
                        />
                      )}
                    /> */}
                  </MuiPickersUtilsProvider>
                </Grid>

                <Grid
                  container
                  item
                  sm={7}
                  spacing={2}
                  style={{ height: "fit-content", padding: "0 2em" }}
                >
                  <Grid item xs={12}>
                    <Typography
                      style={{
                        paddingTop: "1em",
                        fontSize: "1.2em",
                        fontWeight: "500",
                      }}
                      fullWidth
                    >
                      {`${moment(new Date(week || startDate)).format("LL")}`}
                    </Typography>
                  </Grid>
                  {calenderViewEvents[startDate.format("YYYY-MM-DD")] &&
                    calenderViewEvents[startDate.format("YYYY-MM-DD")].map(
                      (slot, index) => {
                        return (
                          <Grid item key={index} xs={matches ? 4 : 3}>
                            <Button
                              fullWidth
                              className={`${classes.timeButton} ${
                                timeChosen.time &&
                                timeChosen.time.toISOString() ===
                                  slot.startDate.toISOString()
                                  ? classes.activeTimeButton
                                  : classes.inActiveTimeButton
                              }`}
                              variant={"outlined"}
                              onClick={() => handleTimeClick(slot.startDate)}
                            >
                              {moment(slot.startDate).format("LT")}
                            </Button>
                          </Grid>
                        );
                      }
                    )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid className={classes.eventList}>
            <Typography variant="h6" gutterBottom>
              Events List
            </Typography>
            <VendorPublicEvents vendorId={event.userUID} />
          </Grid>
        </Grid>
      );
    }

    return <h1>Not one on one event</h1>;
  }

  return <h1>Something went wrong. Please contact support</h1>;
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2em 10%",
    background:
      "linear-gradient(right, rgba(188, 244, 241, 1),rgba(0, 212, 255, 1) )",
    [theme.breakpoints.down("sm")]: {
      padding: "0em 0.5em 0.5em 0.5em",
    },
  },
  calenderContainer: {
    background: "white",
  },
  button: {
    height: "fit-content",
  },
  timeButton: {
    fontWeight: "400",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.75em",
    },
  },
  bookButton: {
    padding: "0.75em 2em",
    fontWeight: "600",
    background: "white",
    boxShadow: "inset 0px 0px 0px 2px black",
    fontSize: "0.8em",
    borderRadius: "2em",
  },
  inActiveTimeButton: {
    color: "#8B8B8B",
    border: "1px #CBCBCB solid",
  },
  activeTimeButton: {
    fontWeight: "600",
    color: "#0061FE",
    border: "1.5px solid",
    borderColor: "#008EFF",
  },
  eventList: {
    padding: "2em 10%",
    [theme.breakpoints.down("sm")]: {
      padding: "1em",
    },
  },
  dayWrapper: {
    position: "relative",
  },
  day: {
    width: 36,
    height: 36,
    fontSize: theme.typography.caption.fontSize,
    margin: "0 2px",
    color: "inherit",
  },
  customDayHighlight: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "2px",
    right: "2px",
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: "50%",
  },
  nonCurrentMonthDay: {
    color: theme.palette.text.disabled,
  },
  highlightNonCurrentMonthDay: {
    color: "#676767",
  },
  highlight: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  firstHighlight: {
    extend: "highlight",
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  },
  endHighlight: {
    extend: "highlight",
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  },
}));

export default CustomerEventScheduler;
