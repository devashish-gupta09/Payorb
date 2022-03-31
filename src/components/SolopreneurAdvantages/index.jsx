import { Grid, Typography } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import React from "react";

import { styles } from "./styles";

function SoloprenuerAdvantages({ content }) {
  const classes = styles();
  return (
    <Grid container className={classes.outerContainer}>
      <img
        src="/assets/solopreneur/advantages-bg1.svg"
        alt="background-image"
        className={classes.bgImg1}
      ></img>
      <img
        src="/assets/solopreneur/advantages-bg2.svg"
        alt="background-image"
        className={classes.bgImg2}
      ></img>
      <Grid className={classes.container} container>
        <Grid
          className={classes.title}
          container
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h4" className={classes.mainTitle}>
            {content.title}
          </Typography>
        </Grid>

        <hr className={classes.divider} />

        <Grid
          container
          className={classes.description}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography>
            <p>{content.para1}</p>
            <p>{content.para2}</p>
          </Typography>
        </Grid>

        <Grid container spacing={2} className={classes.checklistContainer}>
          <Grid item xs={12} sm={6}>
            {content.checklist1.map((list, index) => {
              return (
                <Grid container className={classes.list} key={index}>
                  <Grid
                    item
                    p={1}
                    className={classes.checkIcon}
                    justifyContent={"center"}
                  >
                    <CheckIcon />
                  </Grid>
                  <Grid item xs zeroMinWidth className={classes.listItem}>
                    {list.item}
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
          <Grid item xs={12} sm={6} className={classes.desktop}>
            {content.checklist2.map((list, index) => {
              return (
                <Grid container className={classes.list} key={index}>
                  <Grid
                    item
                    p={1}
                    className={classes.checkIcon}
                    justifyContent={"center"}
                  >
                    <CheckIcon />
                  </Grid>
                  <Grid item xs zeroMinWidth className={classes.listItem}>
                    {list.item}
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SoloprenuerAdvantages;
