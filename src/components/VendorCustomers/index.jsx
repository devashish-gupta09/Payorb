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
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { globalStyles } from "../../../styles/globalStyles";
import { ALERT_TYPES } from "../../constants/alerts";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import useFetchVendorCustomers from "../../hooks/useFetchCustomers";
import useFetchEvents from "../../hooks/useFetchEvents";
import { sendNotificationToCustomers } from "../../services/notification";
import { getMonthDate } from "../../utils/dateTime";
import { getEventDate,getEventMonth } from "../../utils/dateTime";
import { isEventPastDate } from "../../utils/events";
import ButtonCapsule from "../ButtonCapsule";
import ConfirmationAlertDialog from "../ConfirmationAlertDialog";
import DashboardCard from "../DashboardCard";
import Multiselect from "../Multiselect";
import PageTitle from "../PageTitle";
import SkeletonLoading from "../SkeletonLoading";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

function createData(name, phoneNumber, email, date, events, eventList,priceList) {
  return {
    name,
    phoneNumber,
    email,
    events: events.length ?
          [ 
          ...new Set(
            events.map((e) =>e.name).filter((e) => eventList.includes(e))
          ),
        ] 
      : ""   ,
      price: events.length ?
      [ 
        ...new Set(
          events.map((e) =>e.price).filter((e) => priceList.includes(e))
        ),
      ] 
    : ""   ,
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

  const [tableContentCollapse, setTableContentsCollapse]=React.useState(true);

  {/*const addItem = () => {
    setTableContentsCollapse([
      ...tableContentCollapse,
      {
        id: tableContentCollapse.length,
        value: true,
      }
    ]);
  };

  const handleTableCollapse = (index,value) => {
    setTableContentsCollapse(
        tableContentCollapse.map((tableContent) =>
            // Here you accept a id argument to the function and replace it with hard coded 🤪 2, to make it dynamic.
            tableContent.id === index
                ? { ...tableContentCollapse, value: value }
                : { ...tableContentCollapse }
        )
    );
};*/}


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
      events: [{
        id: "abc",
        name: "Event Name ABC",
        type: "online",
        startDate:"2022-04-16T19:20:30+01:00",
        endDate: "2022-07-16T19:20:30+01:00",
        createdDate: "2021-07-16T19:20:30+01:00",
        location:"online",
        category: "business",
        address:"string;",
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
      },{
        id: "abc2",
        name: "EventNameABC2",
        type: "online",
        startDate:"2022-04-16T19:20:30+01:00",
        endDate: "2022-07-16T19:20:30+01:00",
        createdDate: "2021-07-16T19:20:30+01:00",
        location:"online",
        category: "business",
        address:"string;",
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
      }],
      emails: "abxbdh@nsebh.nc",
     },
     {
      customerId: "1234",
      name: "VendorCustomer3",
      phoneNumber:"+91-98286736487",
      email: "abc12@123.com",
      createdAt: "2022-07-16T19:20:30+01:00",
      events: [{
        eventId: "abc3",
        name: "Event Name ABC 3",
        type: "online",
        startDate:"2022-04-16T19:20:30+01:00",
        endDate: "2022-07-16T19:20:30+01:00",
        createdDate: "2021-07-16T19:20:30+01:00",
        location:"online",
        category: "business",
        address:"string;",
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
      },{
        eventId: "abc4",
        name: "EventName",
        type: "online",
        startDate:"2022-04-16T19:20:30+01:00",
        endDate: "2022-07-16T19:20:30+01:00",
        createdDate: "2021-07-16T19:20:30+01:00",
        location:"online",
        category: "business",
        address:"string;",
        description: "This will host new categories",
        price: "500",
        mode: "online",
        photoUrl: "",
        totalTickets: "20",
        link: "https://www.google.com",
        url: "hgvdhgcdus",
        privateMessage:"none",
        orders: "",
        userUID: "harsshdeepKaur",
        vendorUserName: "harshdeepKaur",
        commission: "none",
        bookedSlots: "",
        status: "booked",
      }],
      emails: "abxbdh@nsebh.nc",
     },
  ]);
const [eventLoading,loaded]=React.useState(false);
  const [ events, evntsLoad ] =  React.useState([{
    eventId: "abc",
    name: "Event Name ABC",
    type: "online",
    startDate:"2022-04-16T19:20:30+01:00",
    endDate: "2022-07-16T19:20:30+01:00",
    createdDate: "2021-07-16T19:20:30+01:00",
    location:"online",
    category: "business",
    address:"string;",
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
  },{
    eventId: "abc2",
    name: "EventNameABC2",
    type: "online",
    startDate:"2022-04-16T19:20:30+01:00",
    endDate: "2022-07-16T19:20:30+01:00",
    createdDate: "2021-07-16T19:20:30+01:00",
    location:"online",
    category: "business",
    address:"string;",
    description: "This will host new categories",
    price: "200",
    mode: "online",
    photoUrl: "",
    totalTickets: "20",
    link: "https://www.google.com",
    url: "hgvdhgcdus",
    privateMessage:"none",
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
    startDate:"2022-04-16T19:20:30+01:00",
    endDate: "2022-07-16T19:20:30+01:00",
    createdDate: "2021-07-16T19:20:30+01:00",
    location:"online",
    category: "business",
    address:"string;",
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
  },{
    eventId: "abc4",
    name: "EventName",
    type: "online",
    startDate:"2022-04-16T19:20:30+01:00",
    endDate: "2022-07-16T19:20:30+01:00",
    createdDate: "2021-07-16T19:20:30+01:00",
    location:"online",
    category: "business",
    address:"string;",
    description: "This will host new categories",
    price: "500",
    mode: "online",
    photoUrl: "",
    totalTickets: "20",
    link: "https://www.google.com",
    url: "hgvdhgcdus",
    privateMessage:"none",
    orders: "",
    userUID: "harsshdeepKaur",
    vendorUserName: "harshdeepKaur",
    commission: "none",
    bookedSlots: "",
    status: "booked",
  }],)
  //Dummy data ends here


  
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

//  {if (loading || eventLoading) {
//     return (
//       <Grid className={classes.root}>
//         <PageTitle title="Payorb | Customers" />
//         <SkeletonLoading message={"Loading customers"} />
//       </Grid>
//     );
//   }}

  if (formattedCustomers && events) {
    const eventList = events.map((e) =>e.name);
    const priceList = events.map((e) =>e.price);
    console.log(eventList)
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
          className={classes.title}
          container
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={6}>
          <Typography
            variant={"h6"}
            className={`${globalClasses.boldSixHundred} ${classes.customersTitle}`}
          >
            Customers
          </Typography>
          </Grid>
          <Grid item xs={6}>
          <div
            className={classes.collapseController}
            onClick={() => setCollapsed(!collapsed)}
          >
            {eventLoading ? (
              <CircularProgress />
            ) : (
              <Multiselect
                className={classes.filterSelect}
                events={events}
                setSelected={handleFilterChange}
                selected={selectedValueForFilter}
                label={
                  selectedValueForFilter.length === 1
                    ? events.filter(
                        (e) => e.link === selectedValueForFilter[0]
                      )[0]["name"]
                    : <div style={{fontSize:"0.6em", padding:"0"}}><img src="/assets/vendorCustomers/filterIcon.svg"
                     style={{width:"0.7em",marginTop:"0.35em", padding:"0"}} alt="filter-icon"/>Filter by Events</div>
                }
              />
            )}
          </div>
          </Grid>
        </Grid>
       
         
          {/* {Promotions not included} */}
          {/* {<Grid className={classes.selectDesktopView}>
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
          </Grid>} */}
        
        <DashboardCard>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, backgroundColor:"#EFF0F6",color:"#767676" }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => {
                  console.log(tableContentCollapse)
                 
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                       
                        if(column.id==="events")
                          {
                           console.log(value) 
                            return(
                              <TableCell key={column.id} align={column.align} className={classes.tableContents} style={{margin:0, padding:0}}>
                                <Typography style={{fontWeight:"600", fontSize:"0.9em", padding:"0"}}>
                                {tableContentCollapse? 
                                value[0]
                                 :
                                value.map(val=>
                                    <Grid>  
                                    {val}
                                    <Grid container justify={"space-evenly"} style={{marginTop:"-0.3em"}}>
                                      <Grid item xs={6} container alignItems="center">
                                        <img src="/assets/vendorCustomers/calendar.svg"></img>
                                        <Typography style={{color:"#8B8B8B", fontSize:"0.6em", marginLeft:"0.1em"}}>
                                          17 March 2002
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={6} container alignItems="center">
                                        <AccessTimeIcon style={{color:"#8B8B8B", width:"0.6em"}} />
                                        <Typography  style={{color:"#8B8B8B", fontSize:"0.6em"}}>
                                          12:00 PM - 2:00 PM
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                   </Grid>
                                )}

                                </Typography>
                                </TableCell>
                            )
                          }
                          else if(column.id==="price")
                          {
                            return(
                              <TableCell key={column.id} align={column.align} className={classes.tableContents} style={{margin:0, padding:0}}>
                                <Typography style={{fontWeight:"600", fontSize:"0.9em", padding:"0"}}>
                                <Grid container justify={"space-between"}>
                                  <Grid item xs={9}>
                                  {tableContentCollapse? 
                                    value[0] :
                                    value.map(val=><p>{val}</p>)}
                                    </Grid>
                                  <Grid item xs={3}>
                                    <ArrowDropDownIcon onClick={()=>
                                     {tableContentCollapse? 
                                      setTableContentsCollapse(false): 
                                      setTableContentsCollapse(true)}
                                    }/>
                                  </Grid>
                                </Grid>
                                </Typography>
                                </TableCell>
                            )
                          }
                          else{
                        return (                          
                          <TableCell key={column.id} align={column.align} className={classes.tableContents}>
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
  { id: "name"
  , label: "Customers"
  , minWidth: 80 
  },
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
    color:"#767676",
  },
  {
    id: "email",
    label: "Email ID",
    minWidth: 80,
    align: "center",
    color:"#767676",
  },
  {
    id: "events",
    label: "Event Details",
    minWidth: 180,
    align: "left",
    color:"#767676",
  },
  {
    id:"price",
    label:"Customer TLV",
    minWidth:60,
    align:"center",
    color:"#767676",
  }
];

const styles = makeStyles((theme) => ({
  root: {
    width: "100%",
   
  },
  container: {
    border:"1px solid #DCDCDC",
    margin:"0",
    padding:"0",
    [theme.breakpoints.down("sm")]: {
      height: "45vh",
    },
  },
  title: {
    fontSize: "1.2em",
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
  customersTitle:{
    marginTop:"-1em",
    fontSize:"1em",
    marginLeft:"2em",
  },
  tableContents:{
    fontWeight:"600",
    fontSize:"0.8em",
  },
  filterSelect:{
    width:"8em",
    height:"2em",
    float:"right",
    position:"relative",
    fontSize:"0.8em",
    padding:"0.2em",
  },
  dateAndTime: {
    // height: "100%",
    color: "#68FDF3",
    background: "rgba(0,0,0,0.5)",
    padding: "0.25em 0.5em",
    position: "absolute",
    bottom: 0,
  },
}));

export default VendorCustomers;
