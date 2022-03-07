import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { styles } from "./styles";

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: "#00D4FF",
      backgroundColor: "#00D4FF",
      height: "0.30vw",
      width: "7vw",
      marginBottom:"1em",
    }}
  />
);
function AboutAdvisors({ content }) {
  const classes = styles();
  return (
    <Grid className={classes.container} container justifyContent="center" >
      {/*Title*/}
      <Grid className={classes.title} container alignItems="center" justifyContent="center">
        <Typography variant="h4" className={classes.mainTitle}>
           Advisors
        </Typography>
      </Grid>

      <ColoredLine />

      {/*Array of advisors with their images, title and description mapped*/}
      <Grid container className={classes.advisorContainer}>
        {content.details.map((advisor, index) => {
          return (
            <Grid key={index} item sm={4} >
              <Grid className={classes.advisor}>
                  <img src={advisor.image}/>
                  <Typography className={classes.advisorName}>{advisor.name} </Typography> 
                <Typography className={classes.advisorTitle}> {advisor.title} </Typography>
                <Typography className={classes.advisorTitle}> {advisor.description} </Typography> 
              </Grid>
            </Grid>
          );
        })}
      </Grid>

    </Grid >
  );
}

export default AboutAdvisors;
