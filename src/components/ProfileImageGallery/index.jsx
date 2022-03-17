import { Add } from "@material-ui/icons";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import * as React from "react";
import ButtonCapsule from "../ButtonCapsule";
import { ProfileImageGalleryCard } from "./ProfileImageGalleryCard";

export const ProfileImageGallery = ({
  profileInfo,
  vendor = true,
  updateProfile,
}) => {
  const classes = styles();

  const [assets, setAssets] = React.useState([]);
  const [emptyAssets, setEmptyAssets] = React.useState([]);

  React.useEffect(() => {
    if (profileInfo?.carauselAssets?.length) {
      setAssets([profileInfo.carauselAssets]);
      setEmptyAssets(Array(profileInfo.carauselAssets.length - 6));
    } else {
      setEmptyAssets([0, 0, 0, 0, 0, 0]);
    }
  }, [profileInfo]);

  return (
    <Grid className={classes.root}>
      <Typography variant={"h6"} className={classes.title}>
        Gallery
      </Typography>
      <Grid container spacing={4} className={classes.cardContainer}>
        {assets.length >= 6 &&
          assets.slice(0, 6).map((asset, index) => {
            return (
              <Grid item sm={4} xs={12} className={classes.cardContainerRoot}>
                <ProfileImageGalleryCard
                  key={index}
                  index={index}
                  link={asset.link}
                  type={asset.type}
                />
              </Grid>
            );
          })}

        {assets.length < 6 &&
          assets.map((asset, index) => {
            return (
              <Grid item sm={4} xs={12} className={classes.cardContainerRoot}>
                <ProfileImageGalleryCard
                  index={index}
                  asset={asset}
                  profileInfo={profileInfo}
                  isVendor={vendor}
                />
              </Grid>
            );
          })}

        {assets.length < 6 &&
          emptyAssets.map(() => {
            return (
              <Grid item sm={4} xs={12} className={classes.cardContainerRoot}>
                <ProfileImageGalleryCard />
              </Grid>
            );
          })}
      </Grid>

      {vendor ? (
        <Grid
          container
          justifyContent="center"
          className={classes.addMoreButton}
        >
          <ButtonCapsule text={"Add More"} icon={<Add />} iconBefore={true} />
        </Grid>
      ) : (
        <Grid container justifyContent="center" className={classes.viewMore}>
          <ButtonCapsule text={"View More"} />
        </Grid>
      )}
    </Grid>
  );
};

const styles = makeStyles((theme) => ({
  root: {
    padding: "2em 6em",
    [theme.breakpoints.down("sm")]: {
      padding: "1em",
    },
  },
  cardContainer: {
    [theme.breakpoints.down("sm")]: {
      columnGap: 0,
      rowGap: 15,
      width: "100%",
      justifyContent: "center",
      margin: 0,
    },
  },
  cardContainerRoot: {
    [theme.breakpoints.down("sm")]: {
      // Had to enforce paddings
      padding: "0 !important",
    },
  },
  addMoreButton: {
    padding: "3em",
  },
  title: {
    fontWeight: "bold",
    marginBottom: "1em",
  },
  viewMore: {
    padding: "2em 2.5em",
    "& > button": { background: "#FFFFFF", border: "2px solid" },
  },
}));
