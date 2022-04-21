import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  WeekView,
  Appointments,
  Toolbar,
  ViewSwitcher,
  AllDayPanel,
  DateNavigator,
  MonthView,
  AppointmentTooltip,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";
import {
  Button,
  Dialog,
  Grid,
  IconButton,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { Close, Edit } from "@material-ui/icons";
import moment from "moment";
import * as React from "react";

import { EVENT_TYPES } from "../../constants/events";

import useFetchEventsBetween from "../../hooks/useFetchEventsBetween";
import PostEventCreationDialog from "../PostEventCreationDialog";
import SkeletonLoading from "../SkeletonLoading";
import VendorEventCreationForm from "../VendorEventCreationForm";

const transformEvents = (events) => {
  const transformedEvents = [];
  events.map((event) => {
    if (event.type === EVENT_TYPES.ONE_ON_ONE) {
      event.bookedSlots.map((slot) => {
        const slotStartDate = new Date(slot);
        const slotEndDate = new Date(slot);
        slotEndDate.setHours(slotStartDate.getHours() + event.slotDuration);

        transformedEvents.push({
          title: event.name,
          startDate: slotStartDate,
          endDate: slotEndDate,
          event,
        });
      });
    } else {
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate);
      transformedEvents.push({ title: event.name, startDate, endDate, event });
    }
  });

  return transformedEvents;
};

const today = moment();

function VendorEventsCalenderView() {
  const [startDate, setStartDate] = React.useState(
    today.startOf("week").toISOString()
  );
  const [endDate, setEndDate] = React.useState(
    today.endOf("week").toISOString()
  );

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [calendarView, setCalendarView] = React.useState(
    !matches ? "Week" : "Day"
  );

  const {
    data: events,
    loading,
    error,
  } = useFetchEventsBetween(startDate, endDate);

  const handleDateChange = (currentDate) => {
    const momentDate = moment(currentDate);
    if (calendarView === "Month") {
      setStartDate(momentDate.startOf("month").toISOString());
      setEndDate(momentDate.endOf("month").toISOString());
    } else if (calendarView === "Week") {
      setStartDate(momentDate.startOf("week").toISOString());
      setEndDate(momentDate.endOf("week").toISOString());
    } else {
      setStartDate(momentDate.startOf("day").toISOString());
      setEndDate(momentDate.endOf("day").toISOString());
    }
  };

  const handleViewChange = (currentView) => {
    setCalendarView(currentView);
  };

  React.useEffect(() => {
    handleDateChange(Date.now());
  }, [calendarView]);

  if (loading) {
    return <SkeletonLoading />;
  }

  if (events) {
    const transformedEvents = transformEvents(events);
    return (
      <Grid>
        <Scheduler height={matches ? 500 : 600} data={transformedEvents}>
          <ViewState
            currentDate={startDate}
            onCurrentDateChange={handleDateChange}
            currentViewName={calendarView}
            onCurrentViewNameChange={handleViewChange}
          />

          <DayView startDayHour={9} endDayHour={18} />
          <WeekView startDayHour={9} endDayHour={18} />
          <MonthView />

          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher onChange={handleViewChange} />
          <Appointments />
          <AppointmentTooltip
            showCloseButton
            showOpenButton
            headerComponent={(props) => <CustomAppointmentHeader {...props} />}
          />
          <AllDayPanel />
        </Scheduler>
      </Grid>
    );
  }

  if (error) {
    return <h2>error</h2>;
  }

  return <h1>Something went wrong</h1>;
}

function CustomAppointmentHeader({ onHide, appointmentData }) {
  const { event } = appointmentData;
  const classes = styles();
  const [edit, setEdit] = React.useState(false);
  const [shareDialog, setShareDialog] = React.useState(false);

  const handleEdit = () => {
    setEdit(true);
  };
  const handleClose = () => {
    setEdit(false);
  };

  const handleShareDialog = () => {
    setShareDialog(true);
  };

  const handleShareDialogClose = () => {
    setShareDialog(false);
  };
  return (
    <Grid container>
      {edit && event.type === EVENT_TYPES.ONE_TIME && (
        <Dialog
          PaperProps={{
            className: classes.dialogPaper,
          }}
          open={edit}
          handleClose={handleClose}
        >
          <VendorEventCreationForm
            event={event}
            edit={true}
            handleClose={handleClose}
          />
        </Dialog>
      )}

      {shareDialog && (
        <PostEventCreationDialog
          event={event}
          open={shareDialog}
          onClose={handleShareDialogClose}
        />
      )}

      {event.type === EVENT_TYPES.ONE_TIME && (
        <IconButton onClick={handleEdit}>
          <Edit />
        </IconButton>
      )}

      <Button onClick={handleShareDialog}>Share</Button>
      <IconButton onClick={onHide}>
        <Close />
      </IconButton>
    </Grid>
  );
}

export const styles = makeStyles((theme) => ({
  dialogPaper: {
    maxWidth: "80vw",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100vw",
      padding: "1em",
      margin: "1em",
    },
  },
}));

export default VendorEventsCalenderView;
