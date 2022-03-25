import { Grid, Typography, Card, Button } from "@material-ui/core";
import React from "react";

import { styles } from "./styles";

function SolopreneurSuccessCards({ image, headline, description, date }) {
  const classes = styles();
  return (
    <Card sx={{ maxWidth: 345 }} className={classes.cardContainer}>
      <img width={"100%"} src={image} alt="cover-page" />
      <Grid className={classes.context}>
        <Typography gutterBottom variant="h6" className={classes.headline}>
          {headline}
        </Typography>
        <Typography variant="body2" className={classes.descriptionText}>
          {description}
        </Typography>
        <Grid className={classes.buttonContain} justify={"space-between"}>
          <Button size="small" className={classes.date}>
            {date}
          </Button>
          <Button size="small" className={classes.readMore}>
            Read More
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}

export default SolopreneurSuccessCards;
