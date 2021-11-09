import {
  Button,
  ButtonGroup,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Add, Delete, Edit } from "@material-ui/icons";

import React from "react";

import Carousel from "react-multi-carousel";

import { appColors } from "../../../styles/colors";
import { globalStyles } from "../../../styles/globalStyles";

import { ALERT_TYPES } from "../../constants/alerts";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import { updateUser } from "../../services/auth";
import DashboardCard from "../DashboardCard";
import ProfilePageCarauselEditForm from "../ProfilePageCarauselEditForm";
import VideoPlayer from "../VideoPlayer";
import "react-multi-carousel/lib/styles.css";
import FullScreenImageViewer from "../FullScreenImageViewer";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const initialValue = [
  { link: false, type: false },
  { link: false, type: false },
  { link: false, type: false },
  { link: false, type: false },
  { link: false, type: false },
];

const filters = {
  ALL: "all",
  VIDEOS: "videos",
  IMAGES: "images",
};

function ProfilePageCarausel({ profileData, updateProfile, vendor }) {
  const classes = styles();
  const [carauselAssets, setCarauselAssets] = React.useState([]);
  const [editIndex, setEditIndex] = React.useState(false);
  const { Alert, showAlert } = useAlertSnackbar();
  const [filter, setFilter] = React.useState(filters.ALL);
  const [image, setImage] = React.useState(false);
  const globalClasses = globalStyles();
  React.useEffect(() => {
    if (profileData.carauselAssets && profileData.carauselAssets.length) {
      console.log("setting assets from profile", profileData.carauselAssets);
      setCarauselAssets([...profileData.carauselAssets]);
    } else {
      console.log("setting assets from values", profileData.carauselAssets);
      setCarauselAssets([...initialValue]);
    }
  }, [profileData]);

  const handleDelete = async (index) => {
    let temp = [...carauselAssets];
    temp[index] = { ...initialValue[index] };
    try {
      const res = await updateUser({ carauselAssets: temp });
      if (res?.success) {
        showAlert("User updated.");
        updateProfile({ ...profileData, carauselAssets: temp });
      } else {
        showAlert("User not updated.", ALERT_TYPES.ERROR);
      }
    } catch (err) {
      console.log(err);
      showAlert("User not updated", ALERT_TYPES.ERROR);
    }
  };

  return (
    <div className={classes.container}>
      {image ? (
        <FullScreenImageViewer image={image} setImage={setImage} />
      ) : null}
      {editIndex === false ? null : (
        <ProfilePageCarauselEditForm
          index={editIndex}
          profileData={profileData}
          updateProfile={updateProfile}
          setEditIndex={setEditIndex}
          carauselAssets={carauselAssets}
          setCarauselAssets={setCarauselAssets}
        />
      )}
      <DashboardCard rootClass={classes.root}>
        <Grid container>
          <Typography
            className={`${globalClasses.bold} ${classes.sectionTitle}`}
            gutterBottomcarauselAssets
          >
            Gallery
          </Typography>
        </Grid>
        <Carousel
          swipeable={true}
          draggable={false}
          showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={1000}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          // deviceType={this.props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {vendor
            ? carauselAssets
                .filter((a) =>
                  filter === filters.ALL
                    ? true
                    : filter === filters.IMAGES
                    ? a.type === false || a.type === "image"
                    : filter === filters.VIDEOS
                    ? a.type === false || a.type === "video"
                    : true
                )
                .map((item, i) => (
                  <Item
                    setImage={setImage}
                    handleDelete={handleDelete}
                    key={i}
                    item={item}
                    index={i}
                    setEditIndex={setEditIndex}
                    vendor={vendor}
                  />
                ))
            : carauselAssets
                .filter((a) => a.link && a.type)
                .filter((a) =>
                  filter === filters.ALL
                    ? true
                    : filter === filters.IMAGES
                    ? a.type === false || a.type === "image"
                    : filter === filters.VIDEOS
                    ? a.type === false || a.type === "video"
                    : true
                )
                .map((item, i) => (
                  <Item
                    setImage={setImage}
                    handleDelete={handleDelete}
                    key={i}
                    item={item}
                    index={i}
                    setEditIndex={setEditIndex}
                    vendor={vendor}
                  />
                ))}
        </Carousel>
        <FilterButtonGroup filter={filter} setFilter={setFilter} />
      </DashboardCard>
    </div>
  );
}

function Item(props) {
  return (
    <div
      style={{
        height: "45vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {props.item.type && props.item.link ? (
        props.item.type === "image" ? (
          <>
            {props.vendor ? (
              <ActionButtons
                index={props.index}
                setEditIndex={props.setEditIndex}
                handleDelete={props.handleDelete}
              />
            ) : null}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                onClick={(e) => props.setImage({ ...props.item })}
                src={props.item.link}
                alt="carausel-image"
                style={{ cursor: "pointer", width: "80%", aspectRatio: "1" }}
              />
            </div>
          </>
        ) : props.item.type === "video" ? (
          <>
            {props.vendor ? (
              <ActionButtons
                handleDelete={props.handleDelete}
                index={props.index}
                setEditIndex={props.setEditIndex}
              />
            ) : null}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "80%",
              }}
            >
              <VideoPlayer link={props.item.link} />
            </div>
          </>
        ) : null
      ) : (
        <Add
          onClick={() => props.setEditIndex(props.index)}
          style={{
            fontSize: "6rem",
            color: "#B8B8B8",
            border: "5px dashed #B8B8B8",
            borderRadius: "15px",
            cursor: "pointer",
          }}
        />
      )}
    </div>
  );
}

const ActionButtons = ({ index, handleDelete, setEditIndex }) => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "end",
        alignItems: "center",
        padding: "1rem 2rem",
      }}
    >
      <Edit
        onClick={() => setEditIndex(index)}
        style={{
          fontSize: "1.5rem",
          marginRight: "10px",
          color: "#B8B8B8",
          cursor: "pointer",
        }}
      />
      <Delete
        onClick={() => handleDelete(index)}
        style={{
          fontSize: "1.5rem",
          marginLeft: "10px",
          color: "#B8B8B8",
          cursor: "pointer",
        }}
      />
    </div>
  );
};

const FilterButtonGroup = ({ filter, setFilter }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button
          onClick={() => setFilter(filters.ALL)}
          style={filter === filters.ALL ? { textDecoration: "underline" } : {}}
        >
          All
        </Button>
        <Button
          onClick={() => setFilter(filters.IMAGES)}
          style={
            filter === filters.IMAGES ? { textDecoration: "underline" } : {}
          }
        >
          Images
        </Button>
        <Button
          onClick={() => setFilter(filters.VIDEOS)}
          style={
            filter === filters.VIDEOS ? { textDecoration: "underline" } : {}
          }
        >
          Videos
        </Button>
      </ButtonGroup>
    </div>
  );
};

const styles = makeStyles((theme) => ({
  capsule: {
    marginLeft: "0.3em",
  },
  container: {
    padding: "2em 0",
    minHeight: "65vh",
  },
  root: {
    height: "100%",
    borderRadius: "0.8em",
    padding: "2em",
    [theme.breakpoints.down("sm")]: {
      padding: "1.5em 1em",
    },
  },
  infoRowRoot: { paddingLeft: "1em", width: "80%" },
  infoRow: {
    padding: "1em 0",
    width: "100%",
    borderBottom: "2px",
    borderColor: "#F2F2F2",
    [theme.breakpoints.down("sm")]: {
      padding: "1em",
    },
  },
  reviewerLabel: {
    color: appColors.grey,
  },
  reviewTime: {
    color: appColors.grey,
  },

  textInput: {
    color: "#BDBDBD",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  saveButtonContainer: {
    padding: "1.5em",
  },
  saveButton: {
    width: "30%",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  sectionTitle: {
    width: "fit-content",
    paddingBottom: "1rem",
  },
  cancelButton: {
    [theme.breakpoints.down("sm")]: {
      margin: "1.5em 0 0.5em 0",
    },
  },
}));

export default ProfilePageCarausel;
