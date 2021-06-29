import { Grid } from "@material-ui/core";
import React from "react";

import { useUserAuthDetails } from "../../context/UserAuthDetailContext";
import { getMessageForDetails } from "../../utils/vendor";

import { styles } from "./styles";

const getClassName = (state, classes) => {
  if (state && state.details) {
    const details = getMessageForDetails(state.details);
    if (details) {
      return classes[details.type];
    }
  }
  return "";
};

function VendorDashboardContainer({ children }) {
  const classes = styles();
  const { state } = useUserAuthDetails();
  return (
    <Grid className={`${classes.container} ${getClassName(state, classes)}`}>
      {children}
    </Grid>
  );
}

export default VendorDashboardContainer;
