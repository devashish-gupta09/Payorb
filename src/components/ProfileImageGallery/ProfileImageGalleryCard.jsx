import { Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { appColors } from "../../../styles/colors";
import ReadMore from "../ReadMore";

export const ProfileImageGalleryCard = ({ link, type = "image" }) => {
  const classes = styles();
  return (
    <Grid className={classes.root}>
      <Grid
        className={classes.cardImage}
        style={{ backgroundImage: `url(${link})` }}
      />
      <Grid container className={classes.imageTitle} alignItems="center">
        <Typography className={classes.imageTitleText}>
          Inspiring
          UasdfsfsadfadsfsadfsadfadsfadsfasdfsafsafasdfsadfsadfsadfsadfI/UX
          Designer Portfolios That Take Design to the Next Level
        </Typography>
      </Grid>
      <Grid className={classes.toolkit}>
        <Grid>
          <IconButton size="small" className={classes.editButton}>
            <Edit></Edit>
          </IconButton>
          <IconButton size="small" className={classes.deleteButton}>
            <Delete></Delete>
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

const styles = makeStyles((theme) => ({
  root: {
    position: "relative",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      padding: "0 !important",
    },
  },
  cardImage: {
    height: "20em",
    backgroundSize: "cover",
    borderRadius: "5px",
    boxShadow: "0 0 5px 0 rgba(0,0,0,0.25)",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "15em",
    },
  },
  editButton: {
    color: "#008EFF",
    background: "#FFFFFF",
  },
  deleteButton: {
    background: "#FFFFFF",
    boxShadow: "none",
    color: "#FC6767",
    marginLeft: "0.5em",
  },
  toolkit: {
    position: "absolute",
    top: 0,
    right: "0",
    padding: "0.5em 0.5em 0 0",
  },
  imageTitle: {
    height: "fit-content",
    background: "rgba(0, 0, 0, 0.6)",
    width: "100%",
    bottom: 0,
    position: "absolute",
    padding: "0.5em 1em",
    color: appColors.white,
    borderRadius: "0 0 5px 5px",
    [theme.breakpoints.down("sm")]: {
      padding: "0.5em",
    },
  },
  imageTitleText: {
    background: "none",
    width: "100%",
    wordWrap: "break-word",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.75em",
    },
  },
}));
