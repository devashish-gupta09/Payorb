import { Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import { ArrowBack, Delete, Edit } from "@material-ui/icons";
import ButtonCapsule from "../ButtonCapsule";

const styles = makeStyles((theme) => ({
  root: {
    height: "14.5em",
    width: "100%",
    backgroundColor: "pink",
    position: "relative",
  },
  base: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  buttonLayer: {
    position: "absolute",
    width: "100%",
    padding: "1em 2.5em",
    [theme.breakpoints.down("sm")]: {
      padding: "1em 1.5em"
    }
  },
  backButton: {
    background: "#FFFFFF",
    boxShadow: "none",
  },
  editButton: {
    color: "#008EFF",
    background: "#FFFFFF",
  },
  deleteButton: {
    background: "#FFFFFF",
    boxShadow: "none",
    color: "#FC6767",
    marginLeft: "0.5em"
  },
  defaultBackgroundContainer: {
    background: "linear-gradient(90deg, #BCF4F1 0%, #00D4FF 177.56%)",
    width: "100%",
    height: "100%",
  },
  defaultBannerText: {
    fontSize: "3.5em",
    fontWeight: "700",
    color: "#FFFFFF",
    opacity: "0.35",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2em"
    }
  }
}));

const ProfileHeader = ({ profileData, updateProfile, vendor }) => {
  const classes = styles();
  return <Grid className={classes.root}>
    <Grid className={classes.base}>
      {profileData?.bannerImageUrl ? (<Grid>Hey</Grid>) : (<Grid container justifyContent="center" alignItems="center" className={classes.defaultBackgroundContainer}>
        <Typography className={classes.defaultBannerText}>Add a cover pic</Typography>
      </Grid>)}
    </Grid>
    <Grid container justifyContent="space-between" className={classes.buttonLayer}>
      <Grid>
        <ButtonCapsule
          text=" Back"
          icon={<ArrowBack style={{ fontSize: "1.25em" }} />}
          iconBefore={true}
          buttonStyle={`${classes.backButton}`}
        />
      </Grid>
      <Grid>
        <IconButton
          className={classes.editButton}
        ><Edit></Edit></IconButton>
        <IconButton
          className={classes.deleteButton}
        ><Delete></Delete></IconButton>
      </Grid>
    </Grid>
  </Grid>;
};

export { ProfileHeader };
