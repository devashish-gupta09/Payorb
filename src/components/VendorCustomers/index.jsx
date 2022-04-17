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
} from "@material-ui/core";
import { CalendarToday, FilterList } from "@material-ui/icons";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";

import { globalStyles } from "../../../styles/globalStyles";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";
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
  priceList
) {
  console.log("Events", events);
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
  };
}

function EventDetailsCell({
  classes,
  value,
  column,
  index,
  tableContentCollapse,
}) {
  return (
    <TableCell
      key={column.id}
      align={column.align}
      className={classes.tableContents}
      style={{ margin: 0, padding: "0.25em" }}
    >
      <Typography
        style={{
          fontWeight: "600",
          fontSize: "0.9em",
          padding: "0.2em",
        }}
      >
        {tableContentCollapse[index]
          ? value[0]
          : value.map((val, index) => (
              <Grid key={index}>
                {val.name}
                <Grid container justify={"space-evenly"}>
                  <Grid item xs={6} container alignItems="center">
                    <CalendarToday
                      style={{
                        transform: "scale(0.6)",
                      }}
                    />
                    <Typography
                      style={{
                        color: "#8B8B8B",
                        fontSize: "0.85em",
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
                        fontSize: "0.85em",
                      }}
                    >
                      12:00 PM - 2:00 PM
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            ))}
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
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
        let formattedEvents = customer?.events
          ?.map((link) => {
            return events.find((event) => event.link === link);
          })
          .filter((e) => e);

        formattedCustomersData.push({
          ...customer,
          events: [...formattedEvents],
        });
      });

      setFormattedCustomers([...formattedCustomersData]);
    }
  }, [customers, events]);

  // React.useEffect(() => {
  //   rows.map((item, index) => {
  //     setTableContentsCollapse((tableContentCollapse) => [
  //       ...tableContentCollapse,
  //       true,
  //     ]);
  //   });
  // }, []);

  const handleTableCollapse = (index, value) => {
    console.log(value);
    setTableContentsCollapse(
      tableContentCollapse.map((tableContent, id) =>
        id === index ? value : tableContent
      )
    );
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
  // const onAccept = () => {
  //   sendNotification();
  // };

  if (loading || eventLoading) {
    return (
      <Grid className={classes.root}>
        <PageTitle title="Payorb | Customers" />
        <SkeletonLoading message={"Loading customers"} />
      </Grid>
    );
  }

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

  if (formattedCustomers && events) {
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
              priceList,
              selectedValueForFilter
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
                  border: "2px solid #8B8B8B",
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
                      }}
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
                        if (column.id === "events") {
                          return (
                            <EventDetailsCell
                              classes={classes}
                              value={value}
                              column={column}
                              index={index}
                              tableContentCollapse={tableContentCollapse}
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
                                alignItems="center"
                                justifyContent={"space-between"}
                              >
                                <Grid item xs={8} container>
                                  {tableContentCollapse[index] ? (
                                    <p> ₹{value[0]}</p>
                                  ) : (
                                    value.map((val) => <p key={val}> ₹{val}</p>)
                                  )}
                                </Grid>
                                <Grid item xs={4}>
                                  <ArrowDropDownIcon
                                    onClick={() => {
                                      tableContentCollapse[index]
                                        ? handleTableCollapse(index, false)
                                        : handleTableCollapse(index, true);
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
          // onPageChange={handleChangePage}
          containerClassName={classes.pagination}
          pageClassName={classes.pageItem}
          previousClassName={classes.pageItem}
          nextClassName={classes.pageItem}
          activeClassName={classes.active}
        /> */}
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
    padding: "2em",
  },
  filterSelect: {
    width: "10em",
    marginLeft: "0.5em",
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
    transition: `transform .8s ease`,
    transform: `rotate(0deg)`,
  },
  collapseArrowUp: {
    transform: `rotate(-180deg)`,
    transition: `transform .8s ease`,
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
    fontSize: "1em",
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
