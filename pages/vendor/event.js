import { Grid } from "@material-ui/core";
import React from "react";
import VendorDashboardHeader from "../DashboardHeader";
import { styles } from "./styles";

function VendorEvents() {
    const classes = styles();

    return (
        <Grid>
            <VendorDashboardHeader />
            <Grid className={classes.container}>
            </Grid>
        </Grid>
    );
}

export default VendorEvents;
