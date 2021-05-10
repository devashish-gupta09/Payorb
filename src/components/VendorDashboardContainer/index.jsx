import { Grid } from "@material-ui/core";
import React from "react";

import { styles } from "./styles";

function VendorDashboardContainer({ children }) {
  const classes = styles();
  return <Grid className={classes.container}>{children}</Grid>;
}

export default VendorDashboardContainer;
