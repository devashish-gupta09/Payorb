import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import * as React from "react";
import ButtonCapsule from "../ButtonCapsule";
import { ProfileImageGalleryCard } from "./ProfileImageGalleryCard";

const PROFILE_IMAGES_LIMIT = 10;
const DEFAULT_IMAGE = [
  {
    link: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/31b14965947199.5b05899e2ebb5.jpg",
  },
  {
    link: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/31b14965947199.5b05899e2ebb5.jpg",
  },
  {
    link: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/31b14965947199.5b05899e2ebb5.jpg",
  },
];

export const ProfileImageGallery = ({ profileInfo, vendor, updateProfile }) => {
  const classes = styles();

  const [images, setImages] = React.useState(DEFAULT_IMAGE);

  React.useEffect(() => {
    if (profileInfo?.carauselAssets?.length) {
      setImages([]);
    }
  }, [profileInfo]);

  return (
    <Grid className={classes.root}>
      <Typography variant={"h6"} className={classes.title}>
        Gallery
      </Typography>
      <Grid container spacing={4} className={classes.cardContainer}>
        {images.map(({ link }) => (
          <Grid item sm={4} xs={12} className={classes.cardContainerRoot}>
            <ProfileImageGalleryCard link={link} type={"image"} />
          </Grid>
        ))}
      </Grid>
      <Grid container justifyContent="center" className={classes.addMoreButton}>
        <ButtonCapsule text={"Add More"} icon={<Add />} iconBefore={true} />
      </Grid>
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
}));
