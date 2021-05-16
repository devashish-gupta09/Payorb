import React from "react";
import SkeletonLoading from "../SkeletonLoading";
import useFetchEvents from "../../hooks/useFetchEvents";
import { EVENT_TYPES } from "../../constants/events";

import DashboardCard from "../DashboardCard";

import {
  Button,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import CustomerEventCard from "../CustomerEventCard";
import DateFnsUtils from "@date-io/date-fns";

import { Calendar, MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";
import { common } from "@material-ui/core/colors";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import { useRouter } from "next/router";
import { PAGE_PATHS } from "../../constants/paths";

function generateOneOnOneEventSlots(event) {
  const result = {};
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);
  const slotStartTime = new Date(event.slotStartTimePerDay);
  const slotEndTime = new Date(event.slotEndTimePerDay);

  startDate.setHours(slotStartTime.getHours());
  endDate.setHours(slotEndTime.getHours());

  for (
    var startTime = startDate;
    startTime <= endDate;
    startTime.setHours(startTime.getHours() + event.slotDuration)
  ) {
    if (
      startTime.getHours() >= slotStartTime.getHours() &&
      startTime.getHours() < slotEndTime.getHours()
    ) {
      const endSlot = new Date(startTime);
      endSlot.setHours(startTime.getHours() + event.slotDuration);

      if (!event.bookedSlots.includes(startTime.toISOString())) {
        if (result[startDate.toLocaleDateString()]) {
          result[startDate.toLocaleDateString()].push({
            title: event.name,
            startDate: new Date(startTime),
            link: event.link,
            type: event.type,
          });
        } else {
          result[startDate.toLocaleDateString()] = [
            {
              title: event.name,
              startDate: new Date(startTime),
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

function FlexibleSpaceComponent() {
  return (
    <Grid style={{ padding: "0 1em " }}>
      <h3>Select Event Slot</h3>
    </Grid>
  );
}

function CustomerEventScheduler({ eventLink }) {
  const { events, loading, error } = useFetchEvents(false, { link: eventLink });
  const [week, setWeek] = React.useState();
  const { Alert, showAlert } = useAlertSnackbar();
  const [timeChosen, setTimeChosen] = React.useState({
    selected: false,
  });
  const router = useRouter();

  const handleTimeClick = (time) => {
    console.log("TIME CHANGE");
    setTimeChosen({
      selected: true,
      time,
    });
  };

  if (loading) {
    return <SkeletonLoading />;
  }

  if (error) {
    return <h1>Error fetching event. Please contact support</h1>;
  }

  const handleChange = (data) => {
    console.log(data);
    setWeek(new Date(data));
  };

  const handleBookButton = (startTime, slotDuration) => {
    if (!startTime) {
      showAlert("Please select a suitable time slot");
      return;
    }

    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + parseInt(slotDuration));
    router.push(
      `${PAGE_PATHS.CUSTOMER_EVENTS_REGISTER}?event=${eventLink}&type=${
        EVENT_TYPES.ONE_ON_ONE
      }&from=${startTime.getTime()}&to=${endTime.getTime()}`
    );
  };

  if (events && Object.keys(events).length > 0) {
    const event = events[0];
    const startDate = week || new Date(event.startDate);

    const calenderViewEvents = generateOneOnOneEventSlots(event);
    console.log(calenderViewEvents);
    if (event.type === EVENT_TYPES.ONE_ON_ONE) {
      return (
        <Grid>
          {Alert()}
          <Grid style={{ padding: "1em 0" }}>
            <CustomerEventCard
              event={event}
              expand={true}
              onBook={() => {
                handleBookButton(timeChosen.time, event.slotDuration);
              }}
            ></CustomerEventCard>
          </Grid>
          <DashboardCard>
            <Grid container spacing={3}>
              <Grid item sm={12}>
                <Typography
                  style={{
                    paddingLeft: "1.5em",
                    paddingTop: "1em",
                    fontSize: "1.2em",
                    fontWeight: "500",
                  }}
                >
                  Select Date and Time
                </Typography>
              </Grid>
              <Divider />
              <Grid item sm={5}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Calendar
                    date={startDate}
                    onChange={handleChange}
                    minDate={new Date(event.startDate)}
                    maxDate={new Date(event.endDate)}
                  />
                </MuiPickersUtilsProvider>
              </Grid>

              <Grid
                container
                item
                sm={7}
                spacing={2}
                style={{ height: "fit-content" }}
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
                {calenderViewEvents[startDate.toLocaleDateString()].map(
                  (slot) => (
                    <Grid item xs={3}>
                      <Button
                        fullWidth
                        color={
                          timeChosen.time &&
                          timeChosen.time.toISOString() ===
                            slot.startDate.toISOString()
                            ? "primary"
                            : "secondary"
                        }
                        variant={"outlined"}
                        onClick={() => handleTimeClick(slot.startDate)}
                      >
                        {slot.startDate.toLocaleTimeString()}
                      </Button>
                    </Grid>
                  )
                )}
              </Grid>
            </Grid>
          </DashboardCard>
        </Grid>
      );
    }

    return <h1>Not one on one event</h1>;
  }

  return <h1>Something went wrong. Please contact support</h1>;
}

const useAppointmentTooltipHeaderStyles = makeStyles(() => ({
  button: {
    height: "fit-content",
  },
}));

export default CustomerEventScheduler;
