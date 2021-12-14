import { Grid, Link, makeStyles, Typography } from "@material-ui/core";
import React from "react";

import { PAGE_PATHS } from "../../constants/paths";
import PageTitle from "../PageTitle";

function PolicyList() {
  const classes = styles();
  return (
    <Grid className={classes.root}>
      <PageTitle title="Payorb | Policies" />
      <Typography variant={"h4"} gutterBottom>
        Policies
      </Typography>

      <li>
        <Link href={PAGE_PATHS.POLICY_USER_AGREE}>
          Marketplace Vendor Agreement
        </Link>
      </li>
      <li>
        <Link href={PAGE_PATHS.POLICY_TERMS_AND_CONDS}>
          Terms and Conditions
        </Link>
      </li>
      <li>
        <Link href={PAGE_PATHS.POLICY_PRIVACY}>Privacy</Link>
      </li>
    </Grid>
  );
}

const styles = makeStyles((theme) => ({
  root: {
    margin: "2em 2em",
    padding: "3em 4em",
    textAlign: "justify",
    background: "white",
    [theme.breakpoints.down("sm")]: {
      padding: "2em 1em",
      margin: "2em 0",
    },
    "& > div > ol > li": {
      paddingBottom: "1em",
    },
  },
}));

export default PolicyList;
