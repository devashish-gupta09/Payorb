import {
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import { Send } from "@material-ui/icons";
import SearchIcon from "@material-ui/icons/Search";
import clsx from "clsx";

import React from "react";

import { globalStyles } from "../../../styles/globalStyles";
import { ALERT_TYPES } from "../../constants/alerts";
import { EVENT_STATUS } from "../../constants/events";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import useFetchEvents from "../../hooks/useFetchEvents";
import { sendNotificationToCustomers } from "../../services/notification";
import { getMonthDate } from "../../utils/dateTime";

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
  endDate
) {
  return {
    name,
    date,
    category,
    count,
    status: getEventStatus(startDate, endDate),
    link,
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

function VendorPromotions() {
  const classes = styles();
  const globalClasses = globalStyles();
  const { Alert, showAlert } = useAlertSnackbar();

  const [selectedValueForFilter, setSelectedValueForFilter] = React.useState(
    []
  );
  const [checkedState, setCheckedState] = React.useState([]);
  const [allCheckedState, setAllCheckedState] = React.useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = React.useState();
  // const [rows, setRows] =

  const { loading, events } = useFetchEvents(true, {
    limit: 400,
  });

  const handleOnChange = (position, event) => {
    checkedState[position] = event.target.value;
    setCheckedState(checkedState);
  };

  const handleFilterChange = (event) => {
    const link = event.target.value;
    console.log("SELECTED LINK EVENT", link);
    let temp = [...selectedValueForFilter];
    if (temp.includes(link)) {
      temp = temp.filter((l) => l !== link);
      setSelectedValueForFilter([...temp]);
    } else {
      temp = [...temp];
      setSelectedValueForFilter([...temp]);
    }
  };

  const sendNotification = async (rows) => {
    try {
      const res = await Promise.allSettled(
        checkedState.map(async (cs, index) => {
          if (cs) {
            return sendNotificationToCustomers({
              eventId: rows[index].link,
              // filterEventIds: selectedValueForFilter,
            });
          }
        })
      );

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

  const handleAllCheckboxChange = () => {
    if (allCheckedState) {
      setCheckedState(checkedState.map(() => false));
      setAllCheckedState(false);
    } else {
      setCheckedState(checkedState.map(() => true));
      setAllCheckedState(true);
    }
  };

  //dummy data ends here
  React.useEffect(() => {
    if (events?.length) {
      // events.map(() => {
      setCheckedState(events.map(() => false));
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

  if (events?.length) {
    const rows = events
      .map((event) =>
        createData(
          event.link,
          event.name,
          getMonthDate(event.startDate, event.endDate),
          event.category,
          (event.orders ?? [])?.length,
          event.status,
          event.startDate,
          event.endDate
        )
      )
      .filter((val) =>
        selectedValueForFilter?.length > 0
          ? selectedValueForFilter.includes(val.link)
          : true
      );

    console.log("ROWS", rows);

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
              placeholder="Search"
              InputProps={{
                inputProps: {
                  style: {
                    fontSize: "0.8em",
                    height: "100%",
                  },
                },
                disableUnderline: true,
                style: {
                  border: "1px solid #8B8B8B",
                  borderRadius: "5px",
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      style={{
                        transform: "scale(0.8)",
                        color: "#8B8B8B",
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              className={classes.search}
            />
            {/* <TextField
              select
              value={
                selectedValueForFilter.length === 1
                  ? events.filter(
                      (e) => e.link === selectedValueForFilter[0]
                    )[0]["name"]
                  : "Filter events"
              }
              className={classes.filterSelect}
              onChange={handleFilterChange}
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
              {events.map((event) => (
                <MenuItem
                  style={{ fontSize: "0.8em" }}
                  key={event.link}
                  value={event.link}
                >
                  {event.name}
                </MenuItem>
              ))}
            </TextField> */}
          </Grid>
        </Grid>

        {/* Banner Image */}
        <Grid container style={{ width: "100%" }}>
          <Grid style={{ width: "100%" }}>
            <img
              src={"/assets/promotions-banner.svg"}
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
                {rows.map((row, index) => {
                  console.log(
                    "Is this getting re-renders ?",
                    checkedState[index],
                    index,
                    allCheckedState
                  );
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
                          value={checkedState[index]}
                          checked={checkedState[index]}
                          onChange={(event) => handleOnChange(index, event)}
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
                                    style={{ color: "#767676" }}
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
        </Grid>
        {/* <ReactPaginate
              breakLabel="..."
              previousLabel={"Previous"}
              nextLabel={"Next"}
              //onPageChange={handlePageClick}
              // pageCount={Math.ceil(rows.length/rowsPerPage)}
              pageCount={4}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              renderOnZeroPageCount={null}
              onPageChange={handleChangePage}
              containerClassName={classes.pagination}
              pageClassName={classes.pageItem}
              previousClassName={classes.pageItem}
              nextClassName={classes.pageItem}
              activeClassName={classes.active}
            /> */}
      </Grid>
    );
  }
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
    padding: "2em",
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
      height: "45vh",
      marginTop: "3.5em",
    },
  },
  titleContainer: {
    marginBottom: "1em",
  },
  sendButton: {
    margin: "0",
    background: "white",
    padding: "0.1em 0.5em",
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
  },
}));

export default VendorPromotions;
