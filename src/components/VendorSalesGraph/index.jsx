import { ArgumentScale, Animation } from "@devexpress/dx-react-chart";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import { Grid, makeStyles, Typography, withStyles } from "@material-ui/core";
import { scaleTime } from "d3-scale";
import React from "react";

import { globalStyles } from "../../../styles/globalStyles";
import useFetchStats from "../../hooks/useFetchStats";

import DashboardCard from "../DashboardCard";
import SkeletonLoading from "../SkeletonLoading";

const format = () => (tick) => {
  return tick;
};
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
const demoStyles = () => ({
  chart: {
    paddingRight: "20px",
  },
  title: {
    whiteSpace: "pre",
  },
});

const ValueLabel = (props) => {
  const { text } = props;
  return <ValueAxis.Label {...props} text={`${text}%`} />;
};

const titleStyles = {
  title: {
    whiteSpace: "pre",
  },
};
const TitleText = withStyles(titleStyles)(({ classes, ...props }) => (
  <Title.Text {...props} className={classes.title} />
));

function VendorSalesGraph() {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 7);
  const { data: Test, loading, error } = useFetchStats(startDate, endDate);

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
          <h5>Stats will be generated when you have some bookings.</h5>
        </DashboardCard>
      </Grid>
    );
  }

  if (Test) {
    return (
      <Grid className={classes.root}>
        <Typography
          variant={"h6"}
          className={`${globalClasses.boldSixHundred} ${classes.title}`}
        >
          Sales
        </Typography>
        <DashboardCard>
          <Grid container spacing={5}>
            <Grid item sm={6}>
              <Chart
                data={transformChartDataRevenue(
                  Test.timeSerializedEventsSummary
                )}
                className={classes.chart}
              >
                <ArgumentAxis factory={scaleTime} />
                <ValueAxis labelComponent={ValueLabel} />

                <ArgumentScale factory={scaleTime} />
                {/* <ValueScale factory={scaleLog} modifyDomain={modifyDomain} /> */}
                <LineSeries
                  name="Revenue"
                  valueField="revenue"
                  argumentField="date"
                />

                <Legend
                  position="bottom"
                  rootComponent={Root}
                  itemComponent={Item}
                  labelComponent={Label}
                />
                <Title
                  text={`Weekly Revenue Report`}
                  textComponent={TitleText}
                />
                <Animation />
              </Chart>
            </Grid>
            <Grid item sm={6}>
              <Chart
                data={transformChartDataCustomers(
                  Test.timeSerializedEventsSummary
                )}
                className={classes.chart}
              >
                <ArgumentAxis factory={scaleTime} />
                <ValueAxis labelComponent={ValueLabel} />

                <ArgumentScale factory={scaleTime} />
                {/* <ValueScale factory={scaleLog} modifyDomain={modifyDomain} /> */}
                <LineSeries
                  name="Customers"
                  valueField="customers"
                  argumentField="date"
                />

                <Legend
                  position="bottom"
                  rootComponent={Root}
                  itemComponent={Item}
                  labelComponent={Label}
                />
                <Title
                  text={`Weekly Customer Report`}
                  textComponent={TitleText}
                />
                <Animation />
              </Chart>
            </Grid>
          </Grid>

          {/* <p>
            {JSON.stringify(
              transformChartDataRevenue(Test.timeSerializedEventsSummary)
            )}
          </p> */}
        </DashboardCard>
      </Grid>
    );
  }

  return <h2>Something Went Wrong</h2>;
}

const transformChartDataRevenue = (data) => {
  const test = Object.keys(data)
    .sort()
    .map((dp, index) => ({
      date: new Date(dp),
      revenue: data[dp].eventRevenue,
    }));

  console.log(test);
  return test;
};

const transformChartDataCustomers = (data) => {
  const test = Object.keys(data)
    .sort()
    .map((dp, index) => ({
      date: new Date(dp),
      customers: data[dp].eventCustomers,
    }));

  return test;
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
    fontSize: "1.2em",
    paddingBottom: "1em",
  },
  errorCard: {
    padding: "2em",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

export default VendorSalesGraph;
