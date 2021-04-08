import { Grid } from "@material-ui/core";
import React from "react";
import { styles } from "./styles";

function VendorDashboardContainer({ children }) {
  const classes = styles();
  return <div className={classes.container}>{children}</div>;
}

export default VendorDashboardContainer;
