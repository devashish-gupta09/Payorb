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
import SkeletonLoading from "../SkeletonLoading";
import useFetchEvents from "../../hooks/useFetchEvents";
import { getMonthDate } from "../../utils/dateTime";
import { EVENT_STATUS } from "../../constants/events";
import { date } from "yup/lib/locale";
import useFetchVendorCustomers from "../../hooks/useFetchCustomers";

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

function createData(name, phoneNumber, email, date) {
  return {
    name,
    phoneNumber,
    email,
    date,
  };
}

function VendorCustomers() {
  const classes = styles();
  const globalClasses = globalStyles();

  const { customers, loading, error } = useFetchVendorCustomers();

  if (loading) {
    return (
      <Grid className={classes.root}>
        <SkeletonLoading message={"Loading customers"} />
      </Grid>
    );
  }

  console.log(customers);

  if (customers) {
    const rows = customers.map((customer) =>
      createData(
        customer.name,
        customer.phoneNumber,
        customer.email,
        getMonthDate(customer.createdAt, customer.createdAt)
      )
    );

    return (
      <Grid className={classes.root}>
        <Typography
          variant={"h6"}
          className={`${globalClasses.boldSixHundred} ${classes.title}`}
        >
          Customers
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
        </DashboardCard>
      </Grid>
    );
  }

  return <h1>Something went wrong.</h1>;
}

const columns = [
  { id: "name", label: "Customers", minWidth: 170 },
  {
    id: "date",
    label: "Date",
    minWidth: 100,
    align: "center",
  },
  {
    id: "phoneNumber",
    label: "Contact",
    minWidth: 100,
    align: "center",
  },
  {
    id: "email",
    label: "Email",
    minWidth: 100,
    align: "center",
  },
];

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
  },
  title: {
    fontSize: "1.2em",
    paddingBottom: "1em",
  },
}));

export default VendorCustomers;
