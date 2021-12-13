import {
  ArgumentScale,
  Animation,
  SplineSeries,
  EventTracker,
  HoverState,
  LineSeries,
  ScatterSeries,
} from "@devexpress/dx-react-chart";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  Title,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import {
  Grid,
  makeStyles,
  Typography,
  withStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { scaleTime } from "d3-scale";
import { symbol, symbolCircle } from "d3-shape";
import React from "react";

import { globalStyles } from "../../../styles/globalStyles";
import useFetchStats from "../../hooks/useFetchStats";
import { addDaysToDate, subDaysFromDate } from "../../utils/dateTime";

import DashboardCard from "../DashboardCard";
import SkeletonLoading from "../SkeletonLoading";

const legendStyles = () => ({
  root: {
    display: "flex",
    margin: "auto",
    flexDirection: "row",
  },
});
const legendLabelStyles = (theme) => ({
  label: {
    paddingTop: theme.spacing(1),
    whiteSpace: "nowrap",
  },
});
const legendItemStyles = () => ({
  item: {
    flexDirection: "column",
  },
});

const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const legendItemBase = ({ classes, ...restProps }) => (
  <Legend.Item className={classes.item} {...restProps} />
);
const Root = withStyles(legendStyles, { name: "LegendRoot" })(legendRootBase);
const Label = withStyles(legendLabelStyles, { name: "LegendLabel" })(
  legendLabelBase
);
const Item = withStyles(legendItemStyles, { name: "LegendItem" })(
  legendItemBase
);

const RevenueValueLabel = (props) => {
  const { text } = props;
  return <ValueAxis.Label {...props} text={`Rs. ${text}`} />;
};
const CustomerValueLabel = (props) => {
  const { text } = props;
  return <ValueAxis.Label {...props} text={`${Math.round(text)}`} />;
};

const titleStyles = {
  title: {
    whiteSpace: "pre",
  },
};
const TitleText = withStyles(titleStyles)(({ classes, ...props }) => {
  return (
    <>
      <Title.Text {...props} className={classes.title} />
      <h5>{props.description}</h5>
    </>
  );
});

const Point = (type, styles) => (props) => {
  const { arg, val, color } = props;
  return (
    <path
      fill={color}
      transform={`translate(${arg} ${val})`}
      d={symbol()
        .size([10 ** 2])
        .type(type)()}
      style={styles}
    />
  );
};

const CirclePoint = Point(symbolCircle, {
  stroke: "white",
  strokeWidth: "1px",
});

const LineWithCircle = (props) => (
  <React.Fragment>
    <SplineSeries.Path {...props} />
    <ScatterSeries.Path {...props} pointComponent={CirclePoint} />
  </React.Fragment>
);

function VendorSalesGraph() {
  const endDate = new Date();
  const startDate = subDaysFromDate(new Date(), 7);
  const { data: eventData, loading, error } = useFetchStats(startDate, endDate);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const classes = styles();
  const globalClasses = globalStyles();

  if (loading) {
    return (
      <Grid className={classes.root}>
        <SkeletonLoading message="Loading weekly revenue charts" />
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid className={classes.root}>
        <DashboardCard rootClass={classes.errorCard}>
          <h2>Weekly charts not available.</h2>
          <h5>Stats will be generated when you have bookings to display.</h5>
        </DashboardCard>
      </Grid>
    );
  }

  if (eventData) {
    console.log(eventData)
    return (
      <Grid className={classes.root}>
        <Typography
          variant={"h6"}
          className={`${globalClasses.boldSixHundred} ${classes.title}`}
        >
          Sales
        </Typography>
        <DashboardCard>
          <Grid container spacing={2}>
            <Grid
              item
              sm={6}
              style={{
                overflowX: "auto",
                padding: "2em 1em",
              }}
            >
              <Typography className={classes.title} align="center">
                Weekly Revenue Report (in Rs.)
              </Typography>
              <Chart
                data={transformChartDataRevenue(
                  { ...eventData.timeSerializedEventsSummary },
                  startDate,
                  endDate
                )}
                className={classes.chart}
                width={matches && 1000}
              >
                <ArgumentAxis factory={scaleTime} />
                <ValueAxis labelComponent={RevenueValueLabel} />

                <ArgumentScale factory={scaleTime} />
                {/* <ValueScale factory={scaleLog} modifyDomain={modifyDomain} /> */}
                <SplineSeries
                  name="Revenue"
                  valueField="revenue"
                  argumentField="date"
                  seriesComponent={LineWithCircle}
                />
                <Animation />
              </Chart>
            </Grid>
            <Grid
              item
              sm={6}
              style={{
                overflowX: "auto",
                padding: "2em 1em",
              }}
            >
              <Typography className={classes.title} align="center">
                Weekly Customers
              </Typography>
              <Chart
                data={transformChartDataCustomers(
                  {
                    ...eventData.timeSerializedEventsSummary,
                  },
                  startDate,
                  endDate
                )}
                className={classes.chart}
                width={matches && 1000}
              >
                <ArgumentAxis factory={scaleTime} />
                <ValueAxis labelComponent={CustomerValueLabel} />

                <ArgumentScale factory={scaleTime} />
                {/* <ValueScale factory={scaleLog} modifyDomain={modifyDomain} /> */}
                <LineSeries
                  name="Customers"
                  valueField="customers"
                  argumentField="date"
                  seriesComponent={LineWithCircle}
                />

                <Animation />
                <EventTracker />
                <HoverState />
              </Chart>
            </Grid>
          </Grid>

          {/* <p>
            {JSON.stringify(
              transformChartDataRevenue(eventData.timeSerializedEventsSummary)
            )}
          </p> */}
        </DashboardCard>
      </Grid>
    );
  }

  return <h2>Something Went Wrong</h2>;
}

const transformChartDataRevenue = (data, startDate, endDate) => {
  // const result = [];

  let offset = startDate;
  while (offset <= endDate) {
    if (!data[new Date(offset).toLocaleDateString()]) {
      data[offset] = {
        eventCount: 0,
        eventCustomers: 0,
        eventRevenue: 0,
      };
    }
    offset = addDaysToDate(offset, 1);
  }

  return Object.keys(data)
    .map((dp, index) => ({
      date: new Date(dp),
      revenue: data[dp].eventRevenue,
    }))
    .sort((a, b) => a.date - b.date);
};

const transformChartDataCustomers = (data, startDate, endDate) => {
  let offset = startDate;
  while (offset <= endDate) {
    if (!data[new Date(offset).toLocaleDateString()]) {
      data[offset] = {
        eventCount: 0,
        eventCustomers: 0,
        eventRevenue: 0,
      };
    }
    offset = addDaysToDate(offset, 1);
  }

  return Object.keys(data)
    .map((dp) => ({
      date: new Date(dp),
      customers: data[dp].eventCustomers,
    }))
    .sort((a, b) => a.date - b.date);
};

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
    fontSize: "1.4em",
    fontWeight: "bold",
    paddingBottom: "1.5em",
    [theme.breakpoints.down("sm")]: {},
  },
  errorCard: {
    padding: "2em",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

export default VendorSalesGraph;
