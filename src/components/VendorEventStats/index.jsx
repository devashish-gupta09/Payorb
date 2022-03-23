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
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { usePagination } from '@material-ui/lab/Pagination';


import { globalStyles } from "../../../styles/globalStyles";
import { EVENT_STATUS } from "../../constants/events";
import useFetchEvents from "../../hooks/useFetchEvents";
import { getMonthDate } from "../../utils/dateTime";
import DashboardCard from "../DashboardCard";
import SkeletonLoading from "../SkeletonLoading";

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
    boxShadow:"0px 1px 0px #DADBE4",
    border:"1px solid #DCDCDC",
  },
  title: {
    fontSize: "1.2em",
    marginLeft:"3.5em",
    marginTop:"2em",
  },
  tableStyle:{
    backgroundColor:"#DCDCDC",
    color:"#767676",
  },
  ul: {
    listStyle: 'none',
    padding: 0,
    marginTop: "1em",
    display: 'flex',
    float:"right",
    borderStyle:"1px solid #CFCFCF",
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
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(rows.length / rowsPerPage);


  const { items } = usePagination({
    count: maxPage,
  });


  const { loading, events, changeLimit, loadMoreEvents } = useFetchEvents(
    true,
    {
      limit: 6,
    }
  );

  const globalClasses = globalStyles();

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
  const [checked, setChecked] = React.useState(true);
  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
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

    return (
      <Grid className={classes.root}>
        <Typography
          variant={"h6"}
          className={`${globalClasses.boldSixHundred} ${classes.title}`}
        >
          Events
        </Typography>
        <DashboardCard>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow className={classes.tableStyle} >
                <Checkbox
                        color="primary"
                        onChange={handleCheckboxChange}
                      />
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, backgroundColor:"#DCDCDC",  color:"#767676", fontWeight:"600", }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
              
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index} className={classes.container}>
                        <Checkbox
                        color="primary"
                        onChange={handleCheckboxChange}
                      />
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value.status}
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
          <nav>
                    <ul className={classes.ul}>
                      {items.map(({ page, type, selected, ...item }, index) => {
                        let children = null;

                        if (type === 'start-ellipsis' || type === 'end-ellipsis') {
                          children = '…';
                        } else if (type === 'page') {
                          children = (
                            <button type="button" 
                            
                              style={{ fontWeight: selected ? 'bold' : undefined, 
                                background: selected? "linear-gradient(180deg, #68FDF3 0%, #00D4FF 100%)":"none",
                                borderStyle:"1px solid #CFCFCF",
                                width:"2em",
                              }}

                             {...item}
                             onClick={handleChangePage}
                             >
                              {page}
                            </button>
                          );
                        } else {
                          children = (
                            <button type="button" {...item}>
                              {type}
                            </button>
                          );
                        }

                        return <li key={index}>{children}</li>;
                      })}
                    </ul>
                  </nav>
        </DashboardCard>
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
