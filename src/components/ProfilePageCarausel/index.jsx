import { Button, makeStyles, Paper } from "@material-ui/core";
import { Add, Delete, Edit } from "@material-ui/icons";

import React from "react";
import Carousel from "react-material-ui-carousel";

import { appColors } from "../../../styles/colors";
import DashboardCard from "../DashboardCard";
import ProfilePageCarauselEditForm from "../ProfilePageCarauselEditForm";
import VideoPlayer from "../VideoPlayer";

const initialValue = [
  { link: false, type: false },
  { link: false, type: false },
  { link: false, type: false },
  { link: false, type: false },
  { link: false, type: false },
];

function ProfilePageCarausel({ profileData, updateProfile }) {
  const classes = styles();
  const [carauselAssets, setCarauselAssets] = React.useState([]);
  const [editIndex, setEditIndex] = React.useState(false);

  React.useEffect(() => {
    if (profileData.carauselAssets && profileData.carauselAssets.length) {
      setCarauselAssets([...profileData.carauselAssets]);
    } else {
      setCarauselAssets([...initialValue]);
    }
  }, [profileData]);

  const deleteEntry = (index) => {
    let temp = [...carauselAssets];
    temp[index] = { link: false, type: false };
    setCarauselAssets([...temp]);
  };

  return (
    <div className={classes.container}>
      {editIndex === false ? null : (
        <ProfilePageCarauselEditForm
          index={editIndex}
          setEditIndex={setEditIndex}
          carauselAssets={carauselAssets}
          setCarauselAssets={setCarauselAssets}
        />
      )}
      <DashboardCard rootClass={classes.root}>
        <Carousel
          indicators={true}
          animation="slide"
          style={{ height: "100%" }}
        >
          {carauselAssets.map((item, i) => (
            <Item
              deleteEntry={deleteEntry}
              key={i}
              item={item}
              index={i}
              setEditIndex={setEditIndex}
            />
          ))}
        </Carousel>
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
            <img
              src={props.item.link}
              alt="carausel-image"
              style={{ height: "90%" }}
            />
            <ActionButtons
              index={props.index}
              deleteEntry={props.deleteEntry}
              setEditIndex={props.setEditIndex}
            />
          </>
        ) : props.item.type === "video" ? (
          <>
            <VideoPlayer link={props.item.link} />
            <ActionButtons
              index={props.index}
              deleteEntry={props.deleteEntry}
              setEditIndex={props.setEditIndex}
            />
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

const ActionButtons = ({ index, deleteEntry, setEditIndex }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
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
        onClick={() => deleteEntry(index)}
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

const styles = makeStyles((theme) => ({
  capsule: {
    marginLeft: "0.3em",
  },
  container: {
    padding: "2em 0",
    height: "65vh",
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
  },
  cancelButton: {
    [theme.breakpoints.down("sm")]: {
      margin: "1.5em 0 0.5em 0",
    },
  },
}));

export default ProfilePageCarausel;
