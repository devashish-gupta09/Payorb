import { Grid } from "@material-ui/core";
import React from "react";

function EventRegistrationSection({content}) {
  
  return <Grid style={{ height: "100vh", backgroundColor: "green" }}>{JSON.stringify(content)}</Grid>;
}

export default EventRegistrationSection;
