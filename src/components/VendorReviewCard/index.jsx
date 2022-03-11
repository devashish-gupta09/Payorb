import { Avatar, Grid, makeStyles, Typography } from "@material-ui/core";
import { Star } from "@material-ui/icons";

const starCount = [0, 0, 0, 0];
export const VendorReviewCard = ({ review }) => {
  const classes = styles();
  return (
    <Grid className={classes.infoRowRoot} container>
      <Grid item xs={12}>
        <Typography variant="h6" style={{ fontWeight: "500" }}>
          Ux India Workshop
        </Typography>
      </Grid>
      <Grid container alignItems="stretch" style={{ marginTop: "1em" }}>
        <Grid item xs={1}>
          <Avatar
            src={"/assets/profile.jpg"}
            style={{ width: "2em", height: "2em" }}
          />
        </Grid>
        <Grid item xs={11} className={classes.cardContentContainer}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid style={{ width: "fit-content" }}>Aditya Tondon</Grid>
            <Grid
              container
              style={{ width: "fit-content", height: "fit-content" }}
            >
              {starCount.map((star) => (
                <Star style={{ color: "#FFCE31", fontSize: "1.25em" }} />
              ))}
            </Grid>
          </Grid>
          <p className={classes.paragraph}>
            Progressively administrate collaborative niches after scalable
            partnerships. Rapidiously seize team driven products without
            parallel core.
          </p>
        </Grid>
      </Grid>
    </Grid>
  );
};

const styles = makeStyles((theme) => ({
  infoRowRoot: {
    width: "100%",
    boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.25)",
    background: "#FFFFFF",
    height: "100%",
    padding: "1.5em",
    [theme.breakpoints.down("sm")]: {
      padding: "0.75em",
    },
  },
  paragraph: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.75em",
    },
  },
  cardContentContainer: {
    padding: "0.75em 0.25em 0 0.25em",
    [theme.breakpoints.down("sm")]: { padding: "0.5em 1em 0.25em 1.5em" },
  },
}));
