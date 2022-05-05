import {
  Grid,
  InputAdornment,
  makeStyles,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import { FilterList, Send } from "@material-ui/icons";
import clsx from "clsx";

import React from "react";

import { globalStyles } from "../../../styles/globalStyles";
import { ALERT_TYPES } from "../../constants/alerts";
import { EVENT_STATUS } from "../../constants/events";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import useFetchVendorCustomers from "../../hooks/useFetchCustomers";
import useFetchEvents from "../../hooks/useFetchEvents";
import { sendNotificationToCustomers } from "../../services/notification";

import ButtonCapsule from "../ButtonCapsule";
import DashboardCard from "../DashboardCard";
import PageTitle from "../PageTitle";
import SkeletonLoading from "../SkeletonLoading";

function createData(
  link,
  name,
  date,
  category,
  count,
  status,
  startDate,
  endDate,
  selected
) {
  return {
    name,
    date,
    category,
    count,
    status: getEventStatus(startDate, endDate),
    link,
    selected,
  };
}

const getEventStatus = (startDate, endDate) => {
  if (new Date(endDate) <= Date.now()) {
    return EVENT_STATUS.COMPLETED;
  } else if (new Date(startDate) > Date.now()) {
    return EVENT_STATUS.UPCOMING;
  } else if (
    new Date(endDate) > Date.now() &&
    new Date(startDate) <= Date.now()
  ) {
    return EVENT_STATUS.ONGOING;
  }
};

function VendorPromotions({ vendorId }) {
  const classes = styles();
  const globalClasses = globalStyles();
  const { Alert, showAlert } = useAlertSnackbar();

  const [selectedValueForFilter, setSelectedValueForFilter] = React.useState(
    []
  );
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [allCheckedState, setAllCheckedState] = React.useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = React.useState();
  const [formattedEvents, setFormattedEvents] = React.useState([]);
  const { loading, events } = useFetchEvents(true, {
    userUID: vendorId,
    limit: 400,
  });

  const { customers, loading: customerLoading } = useFetchVendorCustomers();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleOnChange = (value, eventLink) => {
    const selectedState = value;
    const tempIndex = formattedEvents.findIndex((x) => x.link === eventLink);
    const tempArr = [...formattedEvents];
    tempArr[tempIndex] = { ...tempArr[tempIndex], selected: selectedState };
    setFormattedEvents(tempArr);
  };

  const handleFilterChange = (event) => {
    const link = event.target.value;

    if (link) {
      let temp = [...selectedValueForFilter];
      if (temp.includes(link)) {
        temp = temp.filter((l) => l !== link);
        setSelectedValueForFilter([link]);
      } else {
        temp = [...temp];
        setSelectedValueForFilter([link]);
      }
    } else {
      setSelectedValueForFilter([]);
    }
  };

  const sendNotification = async () => {
    try {
      const filtered = formattedEvents.find((event) =>
        selectedValueForFilter.includes(event.link)
      );

      let finalEvents = [];
      if (filtered) {
        finalEvents = formattedEvents
          ?.filter(
            (event) => event.selected && new Date(event.endDate) < new Date()
            // filtered.category === event.category
          )
          .map((event) => event.link);
      } else {
        throw new Error("Select an event from upcoming events list");
      }

      const res = await sendNotificationToCustomers({
        eventId: filtered.link,
        filterEventIds: finalEvents,
      });

      if (res?.success) {
        showAlert("Notification already sent");
      } else if (res) {
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

  const handleAllCheckboxChange = () => {
    let temp = [...formattedEvents];

    setFormattedEvents(
      temp.map((el) => ({ ...el, selected: !allCheckedState }))
    );
    setAllCheckedState(!allCheckedState);
  };

  React.useEffect(() => {
    if (events?.length) {
      setFormattedEvents(
        events.map((event) => ({ ...event, selected: false }))
      );
    }
  }, [events]);

  if (loading) {
    return (
      <Grid className={classes.root}>
        <PageTitle title="Payorb | Promotions" />
        <SkeletonLoading message={"Loading events"} />
      </Grid>
    );
  }

  if (!events?.length) {
    return (
      <DashboardCard>
        <PageTitle title="Payorb | Promotions" />
        <h2>There are no events to display</h2>
        <Typography>
          Create new events and start sharing by heading over to the events
          section
        </Typography>
      </DashboardCard>
    );
  }

  if (formattedEvents?.length) {
    // Rows of the table are past or ongoing events.
    const rows = formattedEvents
      .filter((event) => new Date(event.endDate) <= new Date())
      .map((event) =>
        createData(
          event.link,
          event.name,
          new Date(event.createdDate).toLocaleDateString().split("/").join("-"),
          event.category,
          (event.orders ?? [])?.length,
          event.status,
          event.startDate,
          event.endDate,
          event.selected
        )
      )
      .filter((val) => {
        // if no filter selected, return all past events
        if (selectedValueForFilter?.length === 0) return true;

        const selectedEvent = formattedEvents.find((event) =>
          selectedValueForFilter.includes(event.link)
        );

        if (!selectedEvent) {
          return true;
        }

        return val.count > 0;
      });

    return (
      <Grid className={classes.root}>
        {Alert()}
        <PageTitle title="Payorb | Promotions" />

        {/* Title, search and filter events */}
        <Grid
          container
          className={classes.titleContainer}
          alignItems={"center"}
          justifyContent="space-between"
        >
          <Grid>
            <Typography
              variant={"h6"}
              className={clsx(
                classes.promotionsTitle,
                globalClasses.boldSixHundred
              )}
            >
              Promotions
            </Typography>
          </Grid>

          <Grid container alignItems="center" style={{ width: "fit-content" }}>
            <TextField
              select
              className={classes.filterSelect}
              onChange={handleFilterChange}
              label="Upcoming Events"
              InputProps={{
                disableUnderline: true,
                inputProps: {
                  style: {
                    fontSize: "0.8em",
                    height: "100%",
                  },
                },
                style: {
                  border: "1px solid #8B8B8B",
                  borderRadius: "5px",
                  fontSize: "0.8em",
                },
                startAdornment: (
                  <InputAdornment>
                    <FilterList
                      style={{
                        transform: "scale(0.8)",
                        color: "#8B8B8B",
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem style={{ fontSize: "0.8em" }} value={""}>
                {"None"}
              </MenuItem>
              {/* Render only upcoming events. */}
              {events
                .filter((event) => new Date(event.startDate) > new Date())
                .map((event) => (
                  <MenuItem
                    style={{ fontSize: "0.8em" }}
                    key={event.link}
                    value={event.link}
                  >
                    {event.name}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
        </Grid>

        {/* Banner Image */}
        <Grid container style={{ width: "100%" }}>
          <Grid style={{ width: "100%" }}>
            <img
              src={
                isMobile
                  ? "/assets/sidebar/promotions-banner-mobile.jpg"
                  : "/assets/promotions-banner.jpg"
              }
              className={classes.promotionsBanner}
            ></img>
          </Grid>
        </Grid>

        {/* Table */}
        <Grid>
          <TableContainer className={classes.tableContainer}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow className={classes.tableStyle}>
                  <TableCell>
                    <Checkbox
                      indeterminate
                      color="primary"
                      value={allCheckedState}
                      onChange={handleAllCheckboxChange}
                      size="small"
                      className={classes.checkbox}
                    />
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        backgroundColor: "#EFF0F6",
                        fontSize: "0.8em",
                        color: "#767676",
                        fontWeight: "400",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                  : rows
                ).map((row, index) => {
                  return (
                    <TableRow
                      hover
                      // role="checkbox"
                      tabIndex={-1}
                      key={index}
                      className={classes.tableContainer}
                    >
                      <TableCell>
                        <Checkbox
                          color="primary"
                          value={rows[index].selected}
                          checked={rows[index].selected}
                          onChange={(event) =>
                            handleOnChange(
                              !rows[index].selected,
                              rows[index].link
                            )
                          }
                          size="small"
                          style={{ alignItems: "center", textAlign: "center" }}
                        />
                      </TableCell>
                      {columns.map((column) => {
                        const value = row[column.id];
                        if (column.id === "status") {
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              className={classes.tableContents}
                            >
                              <ButtonCapsule
                                buttonStyle={classes.sendButton}
                                text={`Send`}
                                icon={
                                  <Send
                                    size="small"
                                    style={{
                                      color: "#585858",
                                      transform: "scale(0.5)",
                                    }}
                                  />
                                }
                                onClick={() => sendNotification(rows)}
                              ></ButtonCapsule>
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              className={classes.tableContents}
                            >
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          {formattedEvents?.length > rowsPerPage && (
            <TablePagination
              count={rows.length}
              rowsPerPageOptions={[10]}
              rowsPerPage={rowsPerPage}
              page={page}
              component="div"
              onPageChange={handleChangePage}
            />
          )}
        </Grid>
      </Grid>
    );
  }

  return null;
}

const columns = [
  {
    id: "name",
    label: "Event Name",
    minWidth: 140,
    align: "left",
  },
  {
    id: "date",
    label: "Created On",
    minWidth: 100,
    align: "left",
  },
  {
    id: "category",
    label: "Category",
    minWidth: 100,
    align: "left",
  },
  {
    id: "count",
    label: "Customers Count",
    minWidth: 80,
    align: "center",
  },
  {
    id: "status",
    label: "Promotion Status",
    minWidth: 100,
    align: "left",
  },
  {},
];

const styles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: "2em 2em 5em 2em",
    [theme.breakpoints.down("sm")]: {
      padding: "2em 1em 5em 1em",
    },
  },
  checkbox: {
    position: "relative",
    marginTop: "0.8em",
    fontSize: "0.8em",
    backgroundColor: "#EFF0F6",
    color: "#767676",
  },
  filterSelect: {
    width: "10em",
    marginLeft: "0.5em",
  },
  tableContainer: {
    border: "1px solid #DCDCDC",
    padding: "0",
    [theme.breakpoints.down("sm")]: {
      // height: "45vh",
      marginTop: "1.5em",
    },
  },
  titleContainer: {
    marginBottom: "1em",
  },
  sendButton: {
    border: "1px solid #585858",
    margin: "0",
    fontSize: "0.875em",
    background: "white",
    color: "#585858",
    padding: "0.1em 1em",
    height: "fit-content",
    "& > span > svg": {
      marginLeft: "0.1em",
    },
    "&:hover": {
      background: "#dedede",
    },
    [theme.breakpoints.down("sm")]: {
      width: "30%",
    },
  },
  search: {
    color: "#BDBDBD",
    height: "100%",
    // background: "#ECEDF4",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  promotionsTitle: {
    // fontSize: "1.5em",
  },
  tableContents: {
    fontWeight: "600",
    fontSize: "0.8em",
  },
  pagination: {
    display: "flex",
    listStyle: "none",
    width: "fit-content",
    right: "4em",
    position: "relative",
    float: "right",
    marginTop: "-2em",
    [theme.breakpoints.down("sm")]: {
      marginTop: "0",
      right: "1em",
    },
  },
  pageItem: {
    border: "1px solid #DCDCDC",
    padding: "0.5em",
    fontSize: "0.8em",
    "&:hover": {
      background: "#767676",
    },
  },
  active: {
    background: "linear-gradient(180deg, #68FDF3 0%, #00D4FF 100%)",
  },
  promotionsBanner: {
    width: "100%",
    margin: "1em 0",
    border: "1px solid rgba(0,0,0,0.25)",
    borderRadius: "5px",
    [theme.breakpoints.down("sm")]: {
      margin: "2em 0 0 0",
    },
  },
}));

export default VendorPromotions;
