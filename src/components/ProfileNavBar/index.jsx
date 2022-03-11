import { Grid, List, ListItem, makeStyles, Tabs, Tab } from "@material-ui/core";

import useMobileDetect from "use-mobile-detect-hook";

function ProfileNavBar() {
  const classes = styles();
  const detectMobile = useMobileDetect();
  return (
    <Tabs
      className={classes.root}
      variant={detectMobile.isMobile() ? "fullWidth" : "standard"}
    >
      <Tab label="Profile"></Tab>
      <Tab label="Reviews"></Tab>
      <Tab label="Payments"></Tab>
    </Tabs>
  );
}

const styles = makeStyles((theme) => ({
  root: {
    color: "#929292",
    padding: 0,
    "& > li": {
      display: "inline-block",
      width: "fit-content",
      padding: "1em",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  active: {
    borderBottom: "3.5px solid #008EFF",
    fontWeight: "bold",
    color: "#008EFF",
  },
}));

export { ProfileNavBar };
