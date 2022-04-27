import {
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";
import numeral from "numeral";
import React from "react";

import { EVENT_STATUS } from "../../constants/events";
import useFetchEvents from "../../hooks/useFetchEvents";
import { getMonthDate } from "../../utils/dateTime";
import SkeletonLoading from "../SkeletonLoading";

const styles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: "2em",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: "1em",
    },
  },
  container: {
    // maxHeight: 300,
    boxShadow: "0px 1px 0px #DADBE4",
    border: "1px solid #DCDCDC",
  },
  title: {
    fontSize: "1.2em",
    // marginLeft: "3.5em",
    marginTop: "2em",
  },
  tableStyle: {
    backgroundColor: "#EFF0F6",
    color: "#767676",
  },
  ul: {
    listStyle: "none",
    padding: 0,
    marginTop: "1em",
    display: "flex",
    float: "right",
    borderStyle: "1px solid #CFCFCF",
  },
  status: {
    borderRadius: "2em",
    fontWeight: "500",
    fontSize: "0.8em",
    padding: "0.75em 0 0.75em 0",
  },
  statusCompleted: {
    border: "1px solid #1ECE7A",
    backgroundColor: "rgba(30, 206, 122, 0.2)",
    color: "#1ECE7A",
  },
  statusOnGoing: {
    border: "1px solid #5887FF",
    backgroundColor: "rgba(88, 135, 255, 0.1)",
    color: "#5887FF",
  },
  statusUpcoming: {
    border: "1px solid #FFB648",
    backgroundColor: "rgba(255, 172, 50, 0.1)",
    color: "#5887FF",
  },
  checkbox: {
    position: "relative",
    marginTop: "0.8em",
    fontSize: "0.9em",
  },
}));

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

function createData(name, date, users, mode, revenue, startDate, endDate) {
  return {
    name,
    date,
    users,
    mode,
    revenue,
    status: getEventStatus(startDate, endDate),
  };
}

function VendorEventsStats() {
  const classes = styles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { loading, events, changeLimit, loadMoreEvents, totalEvents } =
    useFetchEvents(true, {
      limit: 6,
    });

  const handleChangePage = async (event, newPage) => {
    if (newPage > page) {
      await loadMoreEvents();
    }
    setPage(newPage);
  };

  const handleChangeRowsPerPage = async (event) => {
    setRowsPerPage(event.target.value);
    // Trigger To fetch events

    if (
      event.target.value > rowsPerPage &&
      events.length < event.target.value
    ) {
      await loadMoreEvents();
    }
    changeLimit(event.target.value + 1);
  };

  if (loading) {
    return (
      <Grid className={classes.root}>
        <SkeletonLoading message={"Loading Events"} />
      </Grid>
    );
  }

  if (events) {
    const rows = events.map((event) =>
      createData(
        event.name,
        getMonthDate(event.startDate, event.endDate),
        event.orders.length,
        event.mode,
        event.revenue ? event.revenue : "0.0",
        event.startDate,
        event.endDate
      )
    );

    const pageCount = Math.ceil(totalEvents / rowsPerPage);
    return (
      <Grid className={classes.root}>
        <Grid>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow className={classes.tableStyle}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        background: "#EFF0F6",
                        color: "#767676",
                        fontWeight: "600",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? rows.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : rows
                ).map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                      className={classes.container}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        if (column.id == "name") {
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ fontWeight: "500", color: "black" }}
                            >
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number" ? (
                                column.format(value)
                              ) : value === "Completed" ? (
                                <Typography
                                  className={`${classes.status} ${classes.statusCompleted}`}
                                >
                                  {value}
                                </Typography>
                              ) : value === "On Going" ? (
                                <Typography
                                  className={`${classes.status} ${classes.statusOnGoing}`}
                                >
                                  {value}
                                </Typography>
                              ) : value === "Upcoming" ? (
                                <Typography
                                  className={`${classes.status} ${classes.statusUpcoming}`}
                                >
                                  {value}
                                </Typography>
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <TablePagination
              page={page}
              rowsPerPageOptions={[5, 10, 20]}
              component="div"
              count={totalEvents}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Grid>
      </Grid>
    );
  }

  return <h1>Something went wrong.</h1>;
}

const columns = [
  { id: "name", label: "Event Name", minWidth: 150 },
  {
    id: "date",
    label: "Date",
    minWidth: 100,
    align: "center",
  },
  {
    id: "users",
    label: "Bookings",
    minWidth: 100,
    align: "center",
  },
  {
    id: "mode",
    label: "Mode",
    minWidth: 100,
    align: "center",
  },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
    align: "center",
  },
  {
    id: "revenue",
    label: "Revenue",
    minWidth: 100,
    format: (value) => numeral(value).format("0,0"),
    align: "center",
  },
];

export default VendorEventsStats;
