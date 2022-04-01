import {
    CircularProgress,
    Grid,
    makeStyles,
    styled,
    MenuItem,
    NativeSelect,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Tooltip,
    TextField,
    InputAdornment, 
    InputBase,

  } from "@material-ui/core";
  import DashboardCard from "../DashboardCard";
  import SearchIcon from '@material-ui/icons/Search';
  import { globalStyles } from "../../../styles/globalStyles";
  import React from "react";
  import { getMonthDate } from "../../utils/dateTime";
  import { EVENT_STATUS } from "../../constants/events";
  import SkeletonLoading from "../SkeletonLoading";
  import Checkbox from "@material-ui/core/Checkbox";
  import useFetchEvents from "../../hooks/useFetchEvents";
  import PageTitle from "../PageTitle";
  import { isEventPastDate } from "../../utils/events";
  import ReactPaginate from 'react-paginate';
  import ButtonCapsule from "../ButtonCapsule";
  import { Send, Info } from "@material-ui/icons";
  import { sendNotificationToCustomers } from "../../services/notification";

  function createData(name, date, category, count, status, startDate, endDate) {
    return {
      name,
      date,
      category,
      count,
      status:  getEventStatus(startDate,endDate),
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

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }));
  
  
  function VendorPromotions(){
    const classes = styles();
    const globalClasses = globalStyles();
    const [eventLoading,loaded]=React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState("");
    const [selectedValueForFilter, setSelectedValueForFilter] = React.useState([]);
    //  { const { loading, events, changeLimit, loadMoreEvents } = useFetchEvents(
    //     true,
    //     {
    //       limit: 6,
    //     }s
    //   );}
    const [loading, setLoading]=React.useState(false);
    const [checkedState,setCheckedState]=React.useState([]);
    const [allCheckedState,setAllCheckedState] = React.useState(false)
    const handleOnChange = (position) => {
      console.log(checkedState)
      const updatedCheckedState = checkedState.map((item, index) =>
        index === position ? !item : item
      );
      setCheckedState(updatedCheckedState);
    }
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
  
    const handleChangePage = async (event, newPage) => {
      if (newPage > page) {
        await loadMoreEvents();
      }
      setPage(newPage);
    };

  const handleAllCheckboxChange=()=>{
  console.log(checkedState)
   if(allCheckedState)
   { setCheckedState(checkedState.map(()=> false));
     setAllCheckedState(false)
   }
   else{
     setCheckedState(checkedState.map(()=> true));
     setAllCheckedState(true)
   }
 }

  //dummy data
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
    bookedSlots: "200",
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
    bookedSlots: "200",
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
    bookedSlots: "190",
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
    userUID: "harshdeepKaur",
    vendorUserName: "harshdeepKaur",
    commission: "none",
    bookedSlots: "80",
    status: "booked",
  }],)
//dummy data ends here
  React.useEffect(()=>{ 
    if(!loading && events?.length)
    {events.map(()=>{
      setCheckedState(state=>[
        ...state, false,
      ])
    })} 
  },[loading]);
  
  if (events) {
    const rows = events.map((event) =>  
        createData(
        event.name,
        getMonthDate(event.startDate, event.endDate),
        event.category,
        event.bookedSlots,
        event.status,
        event.startDate,
        event.endDate,
      )
    );

   //console.log(rows);

   return(
    <Grid className={classes.root}>
    <PageTitle title="Payorb | Promotions" />
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
    Promotions
    </Typography>
    </Grid>
    <Grid item xs={6} sm={6} >
      {eventLoading ? (
        <CircularProgress />
        ) : (
        <Grid container>
        <Grid item xs={6} sm={6} >
        <TextField
        variant="outlined"
        size="small"
        InputProps={{
          startAdornment:(
            <InputAdornment position="start">
              <SearchIcon style={{width:"1em",padding:"0.2em",color:"#8B8B8B"}}/>
            </InputAdornment>
          )
        }}

        // label={<div style={{fontSize:"0.7em", padding:"0", alignItems:"center",color:"#8B8B8B"}}>Search</div>}
        label={"Search"}
        className={classes.search}
      />
      </Grid>
      <Grid item xs={6} sm={6} >
      <NativeSelect
              id="demo-customized-select-native"
             // value={selectedValue}
              value={ selectedValueForFilter.length === 1
                ? events.filter(
                    (e) => e.link === selectedValueForFilter[0]
                  )[0]["name"]
                : <div style={{fontSize:"0.7em", padding:"0"}}><img src="/assets/vendorCustomers/filterIcon.svg"
                style={{width:"0.8em", marginTop:"0.35em", padding:"0", marginRight:"0.5em"}} alt="filter-icon"/>Filter by Events</div>}
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
  <TableContainer className={classes.tableContainer}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
              <TableRow className={classes.tableStyle} >
                <Checkbox
                        color="primary"
                        checked={allCheckedState}
                        onChange={handleAllCheckboxChange}
                        size="small"
                        className={classes.checkbox}
                      />
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, backgroundColor:"#EFF0F6", fontSize:"1em", color:"#767676", fontWeight:"500", }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
              {rows.map((row, index) => {       
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index} className={classes.tableContainer}>             
                   <Checkbox
                      color="primary"
                      checked={checkedState[index]}
                      onChange={() => handleOnChange(index)}
                      size="small"
                      style={{alignItems:"center", textAlign:"center"}}
                    />
                    {columns.map((column) => {
                      const value = row[column.id];
                      if(column.id==="status"){
                        return(    
                        <TableCell key={column.id} align={column.align} className={classes.tableContents}>
                          <ButtonCapsule
                          buttonStyle={classes.sendButton}
                          text={`Send`}
                          icon={<Send size="small" style={{color:"#767676"}}/>}
                          onClick={sendNotification}
                        ></ButtonCapsule>
                        </TableCell>
                        )
                        }
                      else{
                      return( 
                      <TableCell key={column.id} align={column.align} className={classes.tableContents}>
                      {column.format && typeof value === "number"
                        ?column.format(value)
                        :value}
                    </TableCell>
                    )}
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
      )
    }
  return <h1>Something went wrong.</h1>;
}

  const columns = [
    
    { 
      id: "name",
      label: "Event Name",
      minWidth: 140,
      align: "center",
    },
    {
      id: "date",
      label: "Created On",
      minWidth: 100,
      align: "center",
    },
    {
      id: "category",
      label: "Category",
      minWidth: 100,
      align: "center",
    },
    {
      id: "count",
      label: "Customers Count",
      minWidth: 80,
      align: "center",
    },
    {
      id:"status",
      label:"Promotion Status",
      minWidth:100,
      align:"center",
    },
    {

    }
  ];
  
  const styles = makeStyles((theme) => ({
    sendButton: {
      background: "white",
      border: "1px solid #5887FF",
      borderRadius: "2em",
      padding: "0.2em 0.5em",
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
    root: {
      width: "100%",
    },
    checkbox:{
      position:"relative",
      marginTop:"0.8em",
      fontSize:"0.8em",
      backgroundColor:"#EFF0F6",
      color:"#767676",
      fontSize:"0.8em"
    },
    filterSelect:{
      marginRight:"3em",
    },
    tableContainer: {
      border:"1px solid #DCDCDC",
      padding:"0",
      marginTop:"-3.5em",
      [theme.breakpoints.down("sm")]: {
        height: "45vh",
        marginTop:"1em",
      },
    },
    titleContainer:{
      position:"relative",
      justifyContent:"right",
      alignItems:"center",
      justify:"space-around",
    },
    sendButton: {
      margin:"0",
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
    search:{
        width:"12em",
        height:"2em",
        padding:"-0.8em",
        color: "#BDBDBD",
        [theme.breakpoints.down("sm")]: {
          width: "100%",
        },
    },
    customersTitle:{
      marginTop:"-1em",
      fontSize:"1em",
      marginLeft:"3.9em",
    },
    tableContents:{
      fontWeight:"600",
      fontSize:"0.8em",
    }, 
    pagination:{
      display:"flex",
      listStyle:"none",
      width:"fit-content",
      right:"4em",
      position:"relative",
      float:"right",
      marginTop:"-2em",
      [theme.breakpoints.down("sm")]:{
        marginTop:"0",
        right:"1em",
      }},
      pageItem:{
      border:"1px solid #DCDCDC",
      padding:"0.5em",
      fontSize:"0.8em",
      "&:hover": {
        background: "#767676",
      },
      },
      active:{
        background:"linear-gradient(180deg, #68FDF3 0%, #00D4FF 100%)",
      },
  }));
  
  export default VendorPromotions;