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
} from "@material-ui/core";
import { Send } from "@material-ui/icons";
import React from "react";

import { globalStyles } from "../../../styles/globalStyles";
import { ALERT_TYPES } from "../../constants/alerts";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import useFetchVendorCustomers from "../../hooks/useFetchCustomers";
import useFetchEvents from "../../hooks/useFetchEvents";
import { sendNotificationToCustomers } from "../../services/notification";
import { getMonthDate } from "../../utils/dateTime";
import ButtonCapsule from "../ButtonCapsule";
import DashboardCard from "../DashboardCard";
import SkeletonLoading from "../SkeletonLoading";

function createData(name, phoneNumber, email, date) {
  return {
    name,
    phoneNumber,
    email,
    date,
  };
}

function VendorCustomers() {
  const classes = styles();
  const globalClasses = globalStyles();
  const [selectedValue, setSelectedValue] = React.useState("");
  // const [sendBtnLoading, setSendBtnLoading] = React.useState(false);
  const { Alert, showAlert } = useAlertSnackbar();

  const { customers, loading } = useFetchVendorCustomers();
  const { events, loading: eventLoading } = useFetchEvents(true, {
    limit: 400,
    keys: ["name", "link"],
  });

  const handleEventTypeChange = (event) => {
    console.log(event);
    setSelectedValue(event.target.value);
  };

  const sendNotification = async () => {
    try {
      if (!selectedValue) {
        throw new Error("Please select an event from the drop down");
      }

      const res = await sendNotificationToCustomers({ eventId: selectedValue });

      if (res) {
        showAlert("Notification sent");
      }
    } catch (err) {
      if (err.message) {
        showAlert(err.message, ALERT_TYPES.ERROR);
        return;
      } else if (err.error) {
        showAlert(err.error, ALERT_TYPES.ERROR);
        return;
      }
    }
  };

  if (loading) {
    return (
      <Grid className={classes.root}>
        <SkeletonLoading message={"Loading customers"} />
      </Grid>
    );
  }

  if (customers) {
    const rows = customers.map((customer) =>
      createData(
        customer.name,
        customer.phoneNumber,
        customer.email,
        getMonthDate(customer.createdAt, customer.createdAt),
        customer.events
      )
    );

    if (!customers.length) {
      return (
        <DashboardCard>
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
        {Alert()}
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

          <Grid>
            {eventLoading ? (
              <CircularProgress />
            ) : events && events.length ? (
              <Grid container alignItems={"center"}>
                <Typography>Select event</Typography>
                <Select
                  style={{ margin: "0.5em 0.5em" }}
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
                    events.map((event) => (
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
      </Grid>
    );
  }

  return <h1>Something went wrong.</h1>;
}

const columns = [
  { id: "name", label: "Customers", minWidth: 170 },
  {
    id: "date",
    label: "Date",
    minWidth: 100,
    align: "center",
  },
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
    // maxHeight: 300,
  },
  title: {
    fontSize: "1.2em",
    paddingBottom: "1em",
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
  },
}));

export default VendorCustomers;
