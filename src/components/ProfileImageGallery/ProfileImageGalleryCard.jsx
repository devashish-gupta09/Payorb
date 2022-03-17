import { Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import { Add, Delete, Edit } from "@material-ui/icons";
import { appColors } from "../../../styles/colors";
import ReadMore from "../ReadMore";

export const ProfileImageGalleryCard = ({
  asset,
  vendor,
  profileInfo,
  index,
}) => {
  const classes = styles();
  return (
    <Grid className={classes.root}>
      {asset ? (
        <>
          <Grid
            className={classes.cardImage}
            style={{ backgroundImage: `url(${asset.link})` }}
          />{" "}
          <Grid container className={classes.imageTitle} alignItems="center">
            <Typography className={classes.imageTitleText}>
              {asset.title}
            </Typography>
          </Grid>
          {vendor ? (
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
          ) : null}
        </>
      ) : (
        <Grid
          className={classes.nonAssetCard}
          container
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            className={classes.addButton}
            container
            justifyContent="center"
            alignItems="center"
          >
            <Add style={{ fontWeight: 600 }} />
          </Grid>
        </Grid>
      )}
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
  addButton: {
    height: "2.5em",
    width: "2.5em",
    borderRadius: "50%",
    border: "5px solid rgba(221, 221, 221, 1)",
    color: "rgba(221, 221, 221, 1)",
    fontSize: "2em",
  },
  nonAssetCard: {
    width: "100%",
    minHeight: "15em",
    borderRadius: "5px",
    background: "rgba(236, 237, 244, 1)",
  },
  cardImage: {
    height: "15em",
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
