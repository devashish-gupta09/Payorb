import { Grid, Grow, Typography } from "@material-ui/core";
import { globalStyles } from "../../../styles/globalStyles";
import ButtonCapsule from "../ButtonCapsule";
import DashboardCard from "../DashboardCard";
import { styles } from "./styles";

function ProfileInfoCard() {
  const classes = styles();
  const globalClasses = globalStyles();

  return (
    <DashboardCard>
      <Grid container justify="space-between" alignItems="center">
        <Grid
          container
          alignItems="center"
          className={classes.titleCardProfileContainer}
        >
          <Grid>
            <img
              src={
                "https://storage.googleapis.com/bucket_icon_assets/assets/Rectangle%2061.png"
              }
              className={classes.profileImage}
            />
          </Grid>

          <Grid className={classes.titleCardInfoContainer}>
            <Typography variant={"h3"} className={globalClasses.boldSixHundred}>
              Alfredo Culhane
            </Typography>
            <Typography className={classes.grey}>Professor</Typography>
            <Typography className={classes.grey}>Ahmedabad, India</Typography>
          </Grid>
        </Grid>
        <Grid>
          <ButtonCapsule text="Edit Profile"></ButtonCapsule>
        </Grid>
      </Grid>
    </DashboardCard>
  );
}

export default ProfileInfoCard;
