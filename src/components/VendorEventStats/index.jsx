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
import React from "react";
import { globalStyles } from "../../../styles/globalStyles";
import DashboardCard from "../DashboardCard";
import numeral from "numeral";
import { defaultEvents } from "../../constants/events";

const styles = makeStyles((theme) => ({
  root: {
    width: "96%",
    paddingTop: "1.5em",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  container: {
    maxHeight: 300,
  },
  title: {
    fontSize: "1.2em",
    paddingBottom: "1em",
  },
}));

function VendorEventsStats() {
  const classes = styles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const globalClasses = globalStyles();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
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
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </DashboardCard>
    </Grid>
  );
}

const columns = [
  { id: "name", label: "Event Name", minWidth: 170 },
  {
    id: "date",
    label: "Date",
    minWidth: 170,
    align: "center",
  },
  {
    id: "seatsBooked",
    label: "Users",
    minWidth: 170,
    align: "center",
  },
  {
    id: "type",
    label: "Mode",
    minWidth: 170,
    align: "center",
  },

  {
    id: "status",
    label: "Status",
    minWidth: 170,
    format: (value) => value.toFixed(2),
    align: "center",
  },
  {
    id: "totalRevenue",
    label: "Revenue",
    minWidth: 170,
    format: (value) => numeral(value).format("0,0"),
    align: "center",
  },
];

function createData(
  name,
  type,
  dates,
  month,
  totalRevenue,
  seatsBooked,
  status
) {
  return {
    name,
    type,
    date: `${month} ${dates}`,
    totalRevenue,
    seatsBooked,
    status,
  };
}

const rows = defaultEvents.map((event) =>
  createData(
    event.name,
    event.type,
    event.dates,
    event.month,
    event.totalRevenue,
    event.seatsBooked,
    event.status
  )
);

export default VendorEventsStats;
