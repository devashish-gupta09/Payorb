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
  MenuItem,
  TablePagination,
} from "@material-ui/core";
import { CalendarToday, FilterList } from "@material-ui/icons";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import React from "react";

import { globalStyles } from "../../../styles/globalStyles";
import useFetchVendorCustomers from "../../hooks/useFetchCustomers";
import useFetchEvents from "../../hooks/useFetchEvents";
import { getMonthDate } from "../../utils/dateTime";
import DashboardCard from "../DashboardCard";
import { getEventslotDuration } from "../EventBooking";
import PageTitle from "../PageTitle";
import SkeletonLoading from "../SkeletonLoading";

function createData(
  name,
  phoneNumber,
  email,
  date,
  events,
  eventList,
  priceList,
  selectFilter,
  collapsed
) {
  // console.log("Events", events);
  return {
    name,
    phoneNumber,
    email,
    events: events.length
      ? [...new Set(events.filter((e) => eventList.includes(e.name)))]
      : "",
    price: events.length
      ? [
          ...new Set(
            events.map((e) => e.price).filter((e) => priceList.includes(e))
          ),
        ]
      : "",
    collapsed,
  };
}

function EventDetailsCell({ classes, value, column, index, rowCollapsed }) {
  return (
    <TableCell
      key={column.id}
      align={column.align}
      className={classes.tableContents}
      style={{ margin: 0, padding: "0.5em 0" }}
    >
      <Typography
        style={{
          fontWeight: "600",
          fontSize: "0.9em",
          padding: "0.2em",
        }}
      >
        {rowCollapsed ? (
          <>
            {value[0]?.name}
            {value?.length > 1 ? (
              <span
                style={{
                  borderRadius: "50%",
                  background: "#C4C4C4",
                  padding: "0.35em",
                  marginLeft: "0.25em",
                }}
              >
                +{value.length}
              </span>
            ) : null}
          </>
        ) : (
          value.map((val, index) => (
            <Grid
              key={index}
              style={{
                paddingBottom: "0.5em",
              }}
            >
              {val.name}
              <Grid container justify={"space-evenly"}>
                <Grid item xs={6} container alignItems="center">
                  <CalendarToday
                    style={{
                      color: "#8B8B8B",
                      transform: "scale(0.6)",
                    }}
                  />
                  <Typography
                    style={{
                      color: "#8B8B8B",
                      fontSize: "0.875em",
                      marginLeft: "0.1em",
                    }}
                  >
                    {getEventslotDuration(val.startDate, val.endDate).date}
                  </Typography>
                </Grid>
                <Grid item xs={6} container alignItems="center">
                  <AccessTimeIcon
                    style={{
                      color: "#8B8B8B",
                      transform: "scale(0.6)",
                    }}
                  />
                  <Typography
                    style={{
                      color: "#8B8B8B",
                      fontSize: "0.875em",
                    }}
                  >
                    {getEventslotDuration(val.startDate, val.endDate).time}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ))
        )}
      </Typography>
    </TableCell>
  );
}

function VendorCustomers() {
  const classes = styles();
  const globalClasses = globalStyles();
  const [selectedValue, setSelectedValue] = React.useState("");
  const [selectedValueForFilter, setSelectedValueForFilter] = React.useState(
    []
  );

  const [collapsed, setCollapsed] = React.useState(true);

  const [tableContentCollapse, setTableContentsCollapse] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [formattedCustomers, setFormattedCustomers] = React.useState([]);
  const { customers, loading } = useFetchVendorCustomers();
  const { events, loading: eventLoading } = useFetchEvents(true, {
    limit: 500,
    keys: ["name", "link"],
  });

  React.useEffect(() => {
    if (customers && events) {
      let formattedCustomersData = customers.map((customer) => {
        let formattedEvents = customer?.events
          ?.map((link) => {
            return events.find((event) => event.link === link);
          })
          .filter((e) => e);

        return {
          ...customer,
          events: formattedEvents,
          collapsed: true,
        };
      });
      setFormattedCustomers([...formattedCustomersData]);
    }
  }, [customers, events]);

  const handleTableCollapse = (row) => {
    const index = formattedCustomers.findIndex(
      (x) => x.phoneNumber === row.phoneNumber
    );

    const temp = [...formattedCustomers];

    temp[index].collapsed = !temp[index].collapsed;
    setFormattedCustomers([...temp]);
  };

  const handleFilterChange = (event) => {
    const link = event.target.value;

    if (link) {
      let temp = [...selectedValueForFilter];
      if (temp.includes(link)) {
        temp = temp.filter((l) => l !== link);
        setSelectedValueForFilter([link]);
      } else {
        temp = [...temp, link];
        setSelectedValueForFilter([link]);
      }
    } else {
      setSelectedValueForFilter([]);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  if (loading || eventLoading) {
    return (
      <Grid className={classes.root}>
        <PageTitle title="Payorb | Customers" />
        <SkeletonLoading message={"Loading customers"} />
      </Grid>
    );
  }

  if (!formattedCustomers?.length) {
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

  if (formattedCustomers?.length && events?.length) {
    const eventList = events.map((e) => e.name);
    const priceList = events.map((e) => e.price);
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
                priceList,
                selectedValueForFilter,
                customer.collapsed
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
              priceList,
              selectedValueForFilter,
              customer.collapsed
            )
          );

    return (
      <Grid className={classes.root}>
        <PageTitle title="Payorb | Customers" />

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
              className={`${globalClasses.boldSixHundred} ${classes.customersTitle}`}
            >
              Customers
            </Typography>
          </Grid>

          <Grid container alignItems="center" style={{ width: "fit-content" }}>
            <TextField
              select
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
                  border: "2px solid #8B8B8B",
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
              {events.map((event) => (
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

        {/* Table below ! */}
        <Grid>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        maxWidth: column.maxWidth ?? 0,
                        minWidth: column.minWidth ?? 0,
                        backgroundColor: "#EFF0F6",
                        color: "#767676",
                        fontSize: "0.8em",
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
                    <TableRow tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        if (column.id === "events") {
                          return (
                            <EventDetailsCell
                              classes={classes}
                              value={value}
                              column={column}
                              index={index}
                              rowCollapsed={row.collapsed}
                            />
                          );
                        } else if (column.id === "price") {
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              className={classes.tableContents}
                              style={{ margin: 0, padding: "1em" }}
                            >
                              <Grid
                                container
                                alignItems="flex-start"
                                justifyContent={"space-between"}
                              >
                                <Grid item xs={8}>
                                  {row["events"].length === 1 ||
                                  row.collapsed ? (
                                    <p> ₹{value[0]}</p>
                                  ) : (
                                    (value ?? [])?.map((val) => (
                                      <Grid
                                        key={val}
                                        style={{
                                          paddingTop: "0.25em",
                                          paddingBottom: "1em",
                                        }}
                                      >
                                        {" "}
                                        ₹{val}
                                      </Grid>
                                    ))
                                  )}
                                </Grid>
                                <Grid item xs={4}>
                                  <ArrowDropDownIcon
                                    className={
                                      classes[
                                        row.collapsed
                                          ? "collapseArrowDown"
                                          : "collapseArrowUp"
                                      ]
                                    }
                                    onClick={() => {
                                      handleTableCollapse(row);
                                    }}
                                  />
                                </Grid>
                              </Grid>
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
          {formattedCustomers?.length > rowsPerPage && (
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

  return <h1>Something went wrong.</h1>;
}

const columns = [
  { id: "name", label: "Customers", minWidth: 60 },

  {
    id: "phoneNumber",
    label: "Contact",
    minWidth: 60,
    align: "left",
    color: "#767676",
  },
  {
    id: "email",
    label: "Email ID",
    minWidth: 60,
    align: "left",
    color: "#767676",
  },
  {
    id: "events",
    label: "Event Details",
    minWidth: 180,
    align: "left",
    color: "#767676",
    padding: "0.5em",
  },
  {
    id: "price",
    label: "Customer TLV",
    minWidth: 100,
    align: "left",
    color: "#767676",
  },
];

const styles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: "2em 2em 5em 2em",
  },
  filterSelect: {
    width: "10em",
    marginLeft: "0.5em",
  },
  pagination: {
    display: "flex",
    listStyle: "none",
    width: "fit-content",
    // right: "4em",
    position: "relative",
    float: "right",
    // marginTop: "-2em",
    [theme.breakpoints.down("sm")]: {
      marginTop: "0",
      right: "1em",
    },
  },
  pageItem: {
    border: "1px solid #DCDCDC",
    padding: "0.5em 1.25em",
    fontSize: "0.8em",
    "&:hover": {
      background: "#767676",
    },
  },
  active: {
    background: "linear-gradient(180deg, #68FDF3 0%, #00D4FF 100%)",
  },
  container: {
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
  collapseArrowDown: {
    transition: `transform .4s ease`,
    transform: `rotate(0deg)`,
  },
  collapseArrowUp: {
    transform: `rotate(-180deg)`,
    transition: `transform .4s ease`,
  },
  search: {
    color: "#BDBDBD",
    height: "100%",
    // background: "#ECEDF4",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  customersTitle: {
    // fontSize: "1em",
  },
  tableContents: {
    fontWeight: "600",
    fontSize: "0.8em",
  },
  dateAndTime: {
    color: "#68FDF3",
    background: "rgba(0,0,0,0.5)",
    padding: "0.25em 0.5em",
    position: "absolute",
    bottom: 0,
  },
}));

export default VendorCustomers;
