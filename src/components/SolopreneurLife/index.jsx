import { Grid, Typography, Link, Button } from "@material-ui/core";
import React from "react";
import { styles } from "./styles";
import { event, SIGNUP_CLICK } from "../../utils/ga";

function SoloprenuerAdvantages({ content }) {
  const classes = styles();
  return (
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
          <p>{content.para3}</p>
          <Typography className={classes.desktop}>{content.para4}</Typography>
        </Typography>
      </Grid>

      <Grid
        container
        className={classes.buttonContain}
        justifyContent={"center"}
      >
        <Link href={"/signup"}>
          <Button
            className={classes.capsuleButton}
            onClick={() =>
              event({ action: SIGNUP_CLICK, params: { location: "header" } })
            }
          >
            Read Blogs
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}

export default SoloprenuerAdvantages;
