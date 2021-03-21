import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { styles } from "./styles";

function LandingSectionContent({
  sectionLogo,
  sectionTitle,
  title,
  description,
}) {
  const classes = styles();
  return (
    <Grid className={classes.container}>
      <img src={sectionLogo} />
      <Typography className={classes.sectionTitle}>{sectionTitle}</Typography>
      <Typography className={classes.title} variant="h2">
        {title}
      </Typography>
      <Typography className={classes.description}>{description}</Typography>
    </Grid>
  );
}

export default LandingSectionContent;
