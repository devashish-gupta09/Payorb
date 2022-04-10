import {
  CircularProgress,
  Grid,
  makeStyles,
  NativeSelect,
  styled,
  InputBase,
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
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";

import ReactPaginate from "react-paginate";

import { globalStyles } from "../../../styles/globalStyles";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import { getMonthDate } from "../../utils/dateTime";
import DashboardCard from "../DashboardCard";
import PageTitle from "../PageTitle";

function createData(
  name,
  phoneNumber,
  email,
  date,
  events,
  eventList,
  priceList
) {
  return {
    name,
    phoneNumber,
    email,
    events: events.length
      ? [
          ...new Set(
            events.map((e) => e.name).filter((e) => eventList.includes(e))
          ),
        ]
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

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

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

  const [tableContentCollapse, setTableContentsCollapse] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // {const [formattedCustomers, setFormattedCustomers] = React.useState([]);
  // const { customers, loading } = useFetchVendorCustomers();
  // const { events, loading: eventLoading } = useFetchEvents(true, {
  //   limit: 400,
  //   keys: ["name", "link"],
  // });

  // React.useEffect(() => {
  //   if (customers && events) {
  //     let formattedCustomersData = [];
  //     customers.forEach((customer) => {
  //       let formattedEvents = customer?.events
  //         ?.map((link) => {
  //           return events.find((event) => event.link === link);
  //         })
  //         .filter((e) => e);

  //       formattedCustomersData.push({
  //         ...customer,
  //         events: [...formattedEvents],
  //       });
  //     });
  //     console.log(formattedCustomersData);
  //     setFormattedCustomers([...formattedCustomersData]);
  //   }
  // }, [customers, events]);}

  //Dummy data that should be removed later
  const [formattedCustomers, setFormattedCustomers] = React.useState([
    {
      customerId: "1234",
      name: "VendorCustomer1",
      phoneNumber: "+91-9287349247",
      email: "abc@123.com",
      createdAt: "2022-07-16T19:20:30+01:00",
      events: [
        {
          id: "abc",
          name: "Event Name ABC",
          type: "online",
          startDate: "2022-04-16T19:20:30+01:00",
          endDate: "2022-07-16T19:20:30+01:00",
          createdDate: "2021-07-16T19:20:30+01:00",
          location: "online",
          category: "business",
          address: "string;",
          description: "This will host new categories",
          price: "300",
          mode: "online",
          photoUrl: "",
          totalTickets: "20",
          link: "https://www.google.com",
          url: "hgvdhgcdus",
          privateMessage: "none",
          orders: "",
          userUID: "harshdeepKaur",
          vendorUserName: "harshdeepKaur",
          commission: "none",
          bookedSlots: "",
          status: "booked",
        },
        {
          id: "abc2",
          name: "EventNameABC2",
          type: "online",
          startDate: "2022-04-16T19:20:30+01:00",
          endDate: "2022-07-16T19:20:30+01:00",
          createdDate: "2021-07-16T19:20:30+01:00",
          location: "online",
          category: "business",
          address: "string;",
          description: "This will host new categories",
          price: "200",
          mode: "onlinw",
          photoUrl: "",
          totalTickets: "20",
          link: "https://www.google.com",
          url: "hgvdhgcdus",
          privateMessage: "none",
          orders: "",
          userUID: "harshdeepKaur",
          vendorUserName: "harshdeepKaur",
          commission: "none",
          bookedSlots: "",
          status: "booked",
        },
      ],
      emails: "abxbdh@nsebh.nc",
    },
    {
      customerId: "1234",
      name: "VendorCustomer3",
      phoneNumber: "+91-98286736487",
      email: "abc12@123.com",
      createdAt: "2022-07-16T19:20:30+01:00",
      events: [
        {
          eventId: "abc3",
          name: "Event Name ABC 3",
          type: "online",
          startDate: "2022-04-16T19:20:30+01:00",
          endDate: "2022-07-16T19:20:30+01:00",
          createdDate: "2021-07-16T19:20:30+01:00",
          location: "online",
          category: "business",
          address: "string;",
          description: "This will host new categories",
          price: "250",
          mode: "online",
          photoUrl: "",
          totalTickets: "20",
          link: "https://www.google.com",
          url: "hgvdhgcdus",
          privateMessage: "none",
          orders: "",
          userUID: "harshdeepKaur",
          vendorUserName: "harshdeepKaur",
          commission: "none",
          bookedSlots: "",
          status: "booked",
        },
        {
          eventId: "abc4",
          name: "EventName",
          type: "online",
          startDate: "2022-04-16T19:20:30+01:00",
          endDate: "2022-07-16T19:20:30+01:00",
          createdDate: "2021-07-16T19:20:30+01:00",
          location: "online",
          category: "business",
          address: "string;",
          description: "This will host new categories",
          price: "500",
          mode: "online",
          photoUrl: "",
          totalTickets: "20",
          link: "https://www.google.com",
          url: "hgvdhgcdus",
          privateMessage: "none",
          orders: "",
          userUID: "harsshdeepKaur",
          vendorUserName: "harshdeepKaur",
          commission: "none",
          bookedSlots: "",
          status: "booked",
        },
      ],
      emails: "abxbdh@nsebh.nc",
    },
  ]);
  const [eventLoading, loaded] = React.useState(false);
  const [events, evntsLoad] = React.useState([
    {
      eventId: "abc",
      name: "Event Name ABC",
      type: "online",
      startDate: "2022-04-16T19:20:30+01:00",
      endDate: "2022-07-16T19:20:30+01:00",
      createdDate: "2021-07-16T19:20:30+01:00",
      location: "online",
      category: "business",
      address: "string;",
      description: "This will host new categories",
      price: "300",
      mode: "online",
      photoUrl: "",
      totalTickets: "20",
      link: "https://www.google.com",
      url: "hgvdhgcdus",
      privateMessage: "none",
      orders: "",
      userUID: "harshdeepkaur",
      vendorUserName: "harshdeepkaur",
      commission: "none",
      bookedSlots: "",
      status: "booked",
    },
    {
      eventId: "abc2",
      name: "EventNameABC2",
      type: "online",
      startDate: "2022-04-16T19:20:30+01:00",
      endDate: "2022-07-16T19:20:30+01:00",
      createdDate: "2021-07-16T19:20:30+01:00",
      location: "online",
      category: "business",
      address: "string;",
      description: "This will host new categories",
      price: "200",
      mode: "online",
      photoUrl: "",
      totalTickets: "20",
      link: "https://www.google.com",
      url: "hgvdhgcdus",
      privateMessage: "none",
      orders: "",
      userUID: "harshdeepkaur",
      vendorUserName: "harshdeepkaur",
      commission: "none",
      bookedSlots: "",
      status: "booked",
    },
    {
      eventId: "abc3",
      name: "Event Name ABC 3",
      type: "online",
      startDate: "2022-04-16T19:20:30+01:00",
      endDate: "2022-07-16T19:20:30+01:00",
      createdDate: "2021-07-16T19:20:30+01:00",
      location: "online",
      category: "business",
      address: "string;",
      description: "This will host new categories",
      price: "250",
      mode: "online",
      photoUrl: "",
      totalTickets: "20",
      link: "https://www.google.com",
      url: "hgvdhgcdus",
      privateMessage: "none",
      orders: "",
      userUID: "harshdeepKaur",
      vendorUserName: "harshdeepKaur",
      commission: "none",
      bookedSlots: "",
      status: "booked",
    },
    {
      eventId: "abc4",
      name: "EventName",
      type: "online",
      startDate: "2022-04-16T19:20:30+01:00",
      endDate: "2022-07-16T19:20:30+01:00",
      createdDate: "2021-07-16T19:20:30+01:00",
      location: "online",
      category: "business",
      address: "string;",
      description: "This will host new categories",
      price: "500",
      mode: "online",
      photoUrl: "",
      totalTickets: "20",
      link: "https://www.google.com",
      url: "hgvdhgcdus",
      privateMessage: "none",
      orders: "",
      userUID: "harsshdeepKaur",
      vendorUserName: "harshdeepKaur",
      commission: "none",
      bookedSlots: "",
      status: "booked",
    },
  ]);
  //Dummy data ends here

  const handleTableCollapse = (index, value) => {
    console.log(value);
    setTableContentsCollapse(
      tableContentCollapse.map((tableContent, id) =>
        id === index ? value : tableContent
      )
    );
  };

  const handleEventTypeChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleChangePage = async (event, newPage) => {
    if (newPage > page) {
      await loadMoreEvents();
    }
    setPage(newPage);
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

  //  {if (loading || eventLoading) {
  //     return (
  //       <Grid className={classes.root}>
  //         <PageTitle title="Payorb | Customers" />
  //         <SkeletonLoading message={"Loading customers"} />
  //       </Grid>
  //     );
  //   }}

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

    React.useEffect(() => {
      rows.map((item, index) => {
        setTableContentsCollapse((tableContentCollapse) => [
          ...tableContentCollapse,
          true,
        ]);
      });
    }, []);

    return (
      <Grid className={classes.root}>
        <PageTitle title="Payorb | Customers" />
        <Grid
          item
          container
          className={classes.titleContainer}
          alignItems={"center"}
        >
          <Grid item xs={6} sm={6}>
            <Typography
              variant={"h6"}
              className={`${globalClasses.boldSixHundred} ${classes.customersTitle}`}
            >
              Customers
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
            {eventLoading ? (
              <CircularProgress />
            ) : (
              <Grid container>
                <Grid item xs={6} sm={6}>
                  <TextField
                    variant="outlined"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon
                            style={{
                              width: "1em",
                              padding: "0.2em",
                              color: "#8B8B8B",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    // label={<div style={{fontSize:"0.7em", padding:"0", alignItems:"center",color:"#8B8B8B"}}>Search</div>}
                    label={"Search"}
                    className={classes.search}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <NativeSelect
                    id="demo-customized-select-native"
                    // value={selectedValue}
                    value={
                      selectedValueForFilter.length === 1 ? (
                        events.filter(
                          (e) => e.link === selectedValueForFilter[0]
                        )[0]["name"]
                      ) : (
                        <div style={{ fontSize: "0.7em", padding: "0" }}>
                          <img
                            src="/assets/vendorCustomers/filterIcon.svg"
                            style={{
                              width: "0.8em",
                              marginTop: "0.35em",
                              padding: "0",
                              marginRight: "0.5em",
                            }}
                            alt="filter-icon"
                          />
                          Filter by Events
                        </div>
                      )
                    }
                    className={classes.filterSelect}
                    onChange={handleFilterChange}
                    input={<BootstrapInput />}
                    SelectDisplayProps={{
                      style: {
                        width: "10em",
                        background: "white",
                        paddingTop: "0.75em",
                        paddingBottom: "0.75em",
                      },
                    }}
                  >
                    {events.map((event) => (
                      <MenuItem key={event.link} value={event.link}>
                        {event.name}
                      </MenuItem>
                    ))}
                  </NativeSelect>
                </Grid>
              </Grid>
            )}
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
                      style={{
                        minWidth: column.minWidth,
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
                            <TableCell
                              key={column.id}
                              align={column.align}
                              className={classes.tableContents}
                              style={{ margin: 0, padding: 0 }}
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
                                  : value.map((val) => (
                                      <Grid>
                                        {val}
                                        <Grid
                                          container
                                          justify={"space-evenly"}
                                          style={{ marginTop: "-0.3em" }}
                                        >
                                          <Grid
                                            item
                                            xs={6}
                                            container
                                            alignItems="center"
                                          >
                                            <img src="/assets/vendorCustomers/calendar.svg"></img>
                                            <Typography
                                              style={{
                                                color: "#8B8B8B",
                                                fontSize: "0.6em",
                                                marginLeft: "0.1em",
                                              }}
                                            >
                                              17 March 2002
                                            </Typography>
                                          </Grid>
                                          <Grid
                                            item
                                            xs={6}
                                            container
                                            alignItems="center"
                                          >
                                            <AccessTimeIcon
                                              style={{
                                                color: "#8B8B8B",
                                                width: "0.6em",
                                              }}
                                            />
                                            <Typography
                                              style={{
                                                color: "#8B8B8B",
                                                fontSize: "0.6em",
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
                        } else if (column.id === "price") {
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              className={classes.tableContents}
                              style={{ margin: 0, padding: 0 }}
                            >
                              <Typography
                                style={{
                                  fontWeight: "600",
                                  fontSize: "0.9em",
                                  padding: "0",
                                }}
                              >
                                <Grid container justify={"space-between"}>
                                  <Grid item xs={9}>
                                    {tableContentCollapse[index] ? (
                                      <p> ₹{value[0]}</p>
                                    ) : (
                                      value.map((val) => <p> ₹{val}</p>)
                                    )}
                                  </Grid>
                                  <Grid item xs={3}>
                                    <ArrowDropDownIcon
                                      onClick={() => {
                                        tableContentCollapse[index]
                                          ? handleTableCollapse(index, false)
                                          : handleTableCollapse(index, true);
                                      }}
                                    />
                                  </Grid>
                                </Grid>
                              </Typography>
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
        </DashboardCard>
        <ReactPaginate
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
        />
      </Grid>
    );
  }

  return <h1>Something went wrong.</h1>;
}

const columns = [
  { id: "name", label: "Customers", minWidth: 80 },
  // {
  //   id: "date",
  //   label: "Date",
  //   minWidth: 100,
  //   align: "center",
  // },
  {
    id: "phoneNumber",
    label: "Contact",
    minWidth: 80,
    align: "center",
    color: "#767676",
  },
  {
    id: "email",
    label: "Email ID",
    minWidth: 80,
    align: "center",
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
    minWidth: 60,
    align: "center",
    color: "#767676",
  },
];

const styles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  filterSelect: {
    marginRight: "3em",
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
    marginTop: "-3.5em",
    padding: "0",
    [theme.breakpoints.down("sm")]: {
      height: "45vh",
      marginTop: "3.5em",
    },
  },
  titleContainer: {
    position: "relative",
    justifyContent: "right",
    alignItems: "center",
    justify: "space-around",
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
    width: "12em",
    height: "2em",
    padding: "-0.8em",
    color: "#BDBDBD",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  customersTitle: {
    marginTop: "-1em",
    fontSize: "1em",
    marginLeft: "3.9em",
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
