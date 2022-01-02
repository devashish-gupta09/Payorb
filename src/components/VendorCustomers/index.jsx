import {
  CircularProgress,
  Grid,
  makeStyles,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Tooltip,
} from "@material-ui/core";
import { Send, Info } from "@material-ui/icons";
import React from "react";

import { globalStyles } from "../../../styles/globalStyles";
import { ALERT_TYPES } from "../../constants/alerts";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import useFetchVendorCustomers from "../../hooks/useFetchCustomers";
import useFetchEvents from "../../hooks/useFetchEvents";
import { sendNotificationToCustomers } from "../../services/notification";
import { getMonthDate } from "../../utils/dateTime";
import { isEventPastDate } from "../../utils/events";
import ButtonCapsule from "../ButtonCapsule";
import ConfirmationAlertDialog from "../ConfirmationAlertDialog";
import DashboardCard from "../DashboardCard";
import Multiselect from "../Multiselect";
import PageTitle from "../PageTitle";
import SkeletonLoading from "../SkeletonLoading";
function createData(name, phoneNumber, email, date, events, eventList) {
  return {
    name,
    phoneNumber,
    email,
    events: events.length
      ? [
          ...new Set(
            events.map((e) => e.name).filter((e) => eventList.includes(e))
          ),
        ].join(",")
      : "",
  };
}

function VendorCustomers() {
  const classes = styles();
  const globalClasses = globalStyles();
  const [selectedValue, setSelectedValue] = React.useState("");
  const [selectedValueForFilter, setSelectedValueForFilter] = React.useState(
    []
  );
  const [confirmationDialogOpen, setConfirmationDialogOpen] =
    React.useState(false);
  const [collapsed, setCollapsed] = React.useState(true);
  // const [sendBtnLoading, setSendBtnLoading] = React.useState(false);
  const { Alert, showAlert } = useAlertSnackbar();
  const [formattedCustomers, setFormattedCustomers] = React.useState([]);
  const { customers, loading } = useFetchVendorCustomers();
  const { events, loading: eventLoading } = useFetchEvents(true, {
    limit: 400,
    keys: ["name", "link"],
  });

  React.useEffect(() => {
    if (customers && events) {
      let formattedCustomersData = [];
      customers.forEach((customer) => {
        let formattedEvents = customer?.events?.map((link) => {
          events.forEach((event) =>
            event.link === link ? { ...event } : null
          );
        });
        formattedEvents =
          formattedEvents && formattedEvents.length
            ? formattedEvents.filter((v) => v)
            : [];
        formattedCustomersData.push({
          ...customer,
          events: [...formattedEvents],
        });
      });
      console.log(formattedCustomersData);
      setFormattedCustomers([...formattedCustomersData]);
    }
  }, [customers, events]);

  const handleEventTypeChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleFilterChange = (link) => {
    let temp = [...selectedValueForFilter];
    if (temp.includes(link)) {
      temp = temp.filter((l) => l !== link);
      setSelectedValueForFilter([...temp]);
    } else {
      temp = [...temp, link];
      setSelectedValueForFilter([...temp]);
    }
  };

  const onReject = () => {
    console.log("closed");
    setConfirmationDialogOpen(false);
  };

  const onAccept = () => {
    sendNotification();
  };

  const sendNotification = async () => {
    if (
      selectedValueForFilter.length === 0 &&
      confirmationDialogOpen === false
    ) {
      setConfirmationDialogOpen(true);
      return;
    }
    try {
      if (!selectedValue) {
        throw new Error("Please select an event from the drop down");
      }
      const res = await sendNotificationToCustomers({
        eventId: selectedValue,
        filterEventIds: selectedValueForFilter,
      });

      if (res) {
        showAlert("Notification sent");
      }
      setConfirmationDialogOpen(false);
    } catch (err) {
      if (err.message) {
        showAlert(err.message, ALERT_TYPES.ERROR);
        setConfirmationDialogOpen(false);
        return;
      } else if (err.error) {
        showAlert(err.error, ALERT_TYPES.ERROR);
        setConfirmationDialogOpen(false);
        return;
      }
    }
  };

  if (loading || eventLoading) {
    return (
      <Grid className={classes.root}>
        <PageTitle title="Payorb | Customers" />
        <SkeletonLoading message={"Loading customers"} />
      </Grid>
    );
  }

  if (formattedCustomers && events) {
    const eventList = events.map((e) => e.name);
    const rows =
      selectedValueForFilter && selectedValueForFilter.length //if filter is present
        ? formattedCustomers
            .filter((customer) =>
              customer.events
                .map((event) => event.link)
                .some((r) => selectedValueForFilter.includes(r))
            )
            .map((customer) =>
              createData(
                customer.name,
                customer.phoneNumber,
                customer.email,
                getMonthDate(customer.createdAt, customer.createdAt),
                customer.events,
                eventList,
                selectedValueForFilter
              )
            )
        : formattedCustomers.map((customer) =>
            createData(
              customer.name,
              customer.phoneNumber,
              customer.email,
              getMonthDate(customer.createdAt, customer.createdAt),
              customer.events,
              eventList,
              selectedValueForFilter
            )
          );
    if (!formattedCustomers.length) {
      return (
        <DashboardCard>
          <PageTitle title="Payorb | Customers" />
          <h2>There are no customers to display</h2>
          <Typography>
            Create new events and start sharing by heading over to the events
            section
          </Typography>
        </DashboardCard>
      );
    }

    return (
      <Grid className={classes.root}>
        <PageTitle title="Payorb | Customers" />
        {Alert()}
        {confirmationDialogOpen ? (
          <ConfirmationAlertDialog
            open={confirmationDialogOpen}
            onAccept={onAccept}
            onReject={onReject}
            message={
              "Are you sure you wish to send promotional email to all customers? If not, please filter relevant customers based on past events."
            }
          />
        ) : null}
        <Grid
          className={`${classes.title}`}
          container
          justify="space-between"
          alignItems="center"
        >
          <Typography
            variant={"h6"}
            className={`${globalClasses.boldSixHundred} `}
          >
            Customers
          </Typography>
        </Grid>
        <Grid
          className={`${classes.title}`}
          container
          justify="space-between"
          alignItems="center"
        >
          <div
            className={classes.collapseController}
            onClick={() => setCollapsed(!collapsed)}
          >
            <Typography>Filter by Events</Typography>
            {eventLoading ? (
              <CircularProgress />
            ) : (
              <Multiselect
                className={classes.select}
                events={events}
                setSelected={handleFilterChange}
                selected={selectedValueForFilter}
                label={
                  selectedValueForFilter.length === 1
                    ? events.filter(
                        (e) => e.link === selectedValueForFilter[0]
                      )[0]["name"]
                    : selectedValueForFilter.length + " Selected"
                }
              />
            )}
          </div>
          <Grid className={classes.selectDesktopView}>
            {eventLoading ? (
              <CircularProgress />
            ) : events && events.length ? (
              <Grid container alignItems={"center"}>
                <Typography style={{ margin: "0.5em 0.5em" }}>
                  Promote Event
                </Typography>
                <Tooltip
                  title="Send promotional emails for upcoming events"
                  placement="top"
                >
                  <Info style={{ fontSize: "1rem", color: "#808080" }} />
                </Tooltip>
                <Select
                  style={{ margin: "0.5em 0.5em" }}
                  className={classes.select}
                  variant="outlined"
                  value={selectedValue}
                  onChange={handleEventTypeChange}
                  SelectDisplayProps={{
                    style: {
                      width: "10em",
                      background: "white",
                      paddingTop: "0.75em",
                      paddingBottom: "0.75em",
                    },
                  }}
                  MenuProps={{
                    style: {},
                  }}
                >
                  {events &&
                    events
                      .filter((e) => !isEventPastDate(e))
                      .map((event) => (
                        <MenuItem key={event.link} value={event.link}>
                          {event.name}
                        </MenuItem>
                      ))}
                </Select>
                <ButtonCapsule
                  buttonStyle={classes.sendButton}
                  text={`Send`}
                  icon={<Send />}
                  onClick={sendNotification}
                ></ButtonCapsule>
              </Grid>
            ) : null}
          </Grid>
        </Grid>
        <DashboardCard>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </DashboardCard>
        <Grid className={classes.selectMobileView}>
          {eventLoading ? (
            <CircularProgress />
          ) : events && events.length ? (
            <Grid container alignItems={"center"}>
              <Typography style={{ margin: "0.5em 0.5em" }}>
                Promote Event
              </Typography>
              <Tooltip
                title="Send promotional emails for upcoming events"
                placement="top"
              >
                <Info style={{ fontSize: "1rem", color: "#808080" }} />
              </Tooltip>
              <Select
                style={{ margin: "0.5em 0.5em" }}
                className={classes.select}
                variant="outlined"
                value={selectedValue}
                onChange={handleEventTypeChange}
                SelectDisplayProps={{
                  style: {
                    width: "10em",
                    background: "white",
                    paddingTop: "0.75em",
                    paddingBottom: "0.75em",
                  },
                }}
                MenuProps={{
                  style: {},
                }}
              >
                {events &&
                  events
                    .filter((e) => !isEventPastDate(e))
                    .map((event) => (
                      <MenuItem key={event.link} value={event.link}>
                        {event.name}
                      </MenuItem>
                    ))}
              </Select>
              <ButtonCapsule
                buttonStyle={classes.sendButton}
                text={`Send`}
                icon={<Send />}
                onClick={sendNotification}
              ></ButtonCapsule>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    );
  }

  return <h1>Something went wrong.</h1>;
}

const columns = [
  { id: "name", label: "Customers", minWidth: 170 },
  // {
  //   id: "date",
  //   label: "Date",
  //   minWidth: 100,
  //   align: "center",
  // },
  {
    id: "phoneNumber",
    label: "Contact",
    minWidth: 100,
    align: "center",
  },
  {
    id: "email",
    label: "Email",
    minWidth: 100,
    align: "center",
  },
  {
    id: "events",
    label: "Events",
    minWidth: 100,
    align: "center",
  },
];

const styles = makeStyles((theme) => ({
  root: {
    width: "96%",
    paddingTop: "1.5em",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  container: {
    [theme.breakpoints.down("sm")]: {
      height: "45vh",
    },
  },
  title: {
    fontSize: "1.2em",
    paddingBottom: "1em",
  },
  selectMobileView: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  selectDesktopView: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  chips: {
    margin: "0px 5px 5px 0",
  },
  collapseController: {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
  },
  collapseArrowDown: {
    transition: `transform .8s ease`,
    transform: `rotate(0deg)`,
  },
  collapseArrowUp: {
    transform: `rotate(-180deg)`,
    transition: `transform .8s ease`,
  },
  sendButton: {
    background: "white",
    padding: "0.5em 2em",
    height: "fit-content",
    "& > span > svg": {
      marginLeft: "0.5em",
    },
    "&:hover": {
      background: "#dedede",
    },
    [theme.breakpoints.down("sm")]: {
      width: "30%",
    },
  },
}));

export default VendorCustomers;
