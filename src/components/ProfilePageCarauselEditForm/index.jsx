import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  makeStyles,
  Tab,
  Tabs,
  TextField,
  useTheme,
} from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import createHash from "create-hash";
import React from "react";

import SwipeableViews from "react-swipeable-views";

import { v4 } from "uuid";

import { ALERT_TYPES } from "../../constants/alerts";

import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import { updateUser } from "../../services/auth";
import { delay } from "../../utils/dateTime";
import firebase from "../../utils/firebase";
import ImageSelectAndCrop from "../ImageSelectAndCrop";
const values = {
  youtube: "Video URL",
  image: "Image Upload",
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const ProfilePageCarauselEditForm = ({
  index,
  setEditIndex,
  carauselAssets,
  updateProfile,
  profileData,
}) => {
  const classes = styles();
  const [value, setValue] = React.useState(0);
  const { Alert, showAlert } = useAlertSnackbar();
  const [progressLoader, setProgress] = React.useState(false);
  const [dataUrl, setDataUrl] = React.useState();
  const [croppedImg, setCroppedImage] = React.useState();
  const theme = useTheme();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [imageTitle, setImageTitle] = React.useState({ error: false });
  const [data, setData] = React.useState({ ...carauselAssets[index] });

  React.useEffect(() => {
    setData({ ...carauselAssets[index] });
  }, [carauselAssets]);

  const handleDataUrl = React.useCallback((data) => {
    setDataUrl(data);
  }, []);

  const handleTitleChange = (e) => {
    if (e.target.value.length > 50) {
      setImageTitle({ error: "Max Length up to 50 characters" });
    } else {
      setImageTitle({ error: false });
    }
    setData({ ...data, type: "image", title: e.target.value });
  };

  const handleUpload = () => {
    const hash = createHash("sha256");
    hash.update(v4());

    const type = dataUrl.substring(
      dataUrl.indexOf(":") + 1,
      dataUrl.indexOf(";")
    );

    // const auth = FirebaseAuth.Singleton();
    // const user = auth.getUser();

    const ref = firebase.storage().ref();
    const childRef = ref.child(
      `/about-carausel-assets/${hash.digest("hex").substr(0, 10)}.${
        type.split("/")[1]
      }`
    );

    const task = childRef.putString(dataUrl, "data_url", {
      cacheControl: "max-age=1654999999999",
      customMetadata: {
        "Access-Control-Allow-Origin": "*",
      },
    });

    setProgress(true);
    task.on(
      "state_changed",
      (snapshot) => {
        switch (snapshot.state) {
          case firebase.storage.TaskState.CANCELED:
            showAlert("Image upload canceled", ALERT_TYPES.ERROR);
            break;
        }
      },
      (error) => {
        let message = "Image cannot be saved";
        switch (error.code) {
          case "storage/unauthorized":
            message = "Unauthorized User";
            break;
          case "storage/canceled":
            message = "User cancelled file upload";
            break;
        }

        setProgress(false);
        showAlert(message, ALERT_TYPES.ERROR);
      },
      () => {
        task.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
          showAlert("Image saved");
          setProgress(false);
          await delay(2000);
          setCroppedImage(downloadURL);
          setData({
            link: downloadURL,
            type: "image",
            title: data.title ? data.title : "",
          });
          handleSave({
            link: downloadURL,
            type: "image",
            title: data.title ? data.title : "",
          });
        });
      }
    );
  };

  const handleSave = async (data) => {
    let temp = [...carauselAssets];
    temp[index] = { ...data };
    try {
      const res = await updateUser({ carauselAssets: temp });
      if (res?.success) {
        showAlert("User updated.");
        updateProfile({ ...profileData, carauselAssets: temp });
        setEditIndex(false);
      } else {
        showAlert("User not updated.", ALERT_TYPES.ERROR);
      }
    } catch (err) {
      console.log(err);
      showAlert("User not updated", ALERT_TYPES.ERROR);
    }
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <Dialog
      open={true}
      onClose={null}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label={values.youtube} {...a11yProps(0)} />
            <Tab label={"OR"} {...a11yProps(0)} disabled={true} />
            <Tab label={values.image} {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <TextField
              fullWidth
              className={classes.textInput}
              id="videoUrl"
              label="Video Url"
              variant="outlined"
              onChange={(e) => setData({ link: e.target.value, type: "video" })}
              value={data.type === "video" ? data.link : ""}
            />
            <DialogActions>
              <Button onClick={() => setEditIndex(false)}>Cancel</Button>
              <Button onClick={() => handleSave(data)}>SAVE</Button>
            </DialogActions>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}></TabPanel>
          <TabPanel
            value={value}
            index={2}
            dir={theme.direction}
            style={{ textAlign: "center" }}
          >
            <ImageSelectAndCrop
              title="Select image to upload"
              imagePath={croppedImg}
              handleDataUrl={handleDataUrl}
            />
            <TextField
              fullWidth
              className={classes.textInput}
              id="imageTitle"
              label="Title"
              variant="outlined"
              onChange={(e) => handleTitleChange(e)}
              value={data.type === "image" ? data.title : ""}
              error={imageTitle.error}
              helperText={imageTitle.error}
            />
            <DialogActions>
              <Button onClick={() => setEditIndex(false)}>Cancel</Button>
              <Button onClick={() => handleUpload()}>
                {progressLoader ? (
                  <CircularProgress
                    size="1.5em"
                    variant="indeterminate"
                    style={{ color: "grey", marginRight: "0.2em" }}
                  />
                ) : (
                  <CloudUpload
                    style={{ color: "grey", marginRight: "0.2em" }}
                  />
                )}
                &nbsp;Save
              </Button>
            </DialogActions>
          </TabPanel>
        </SwipeableViews>
      </div>
      {/* <DialogActions>
        <Button onClick={() => setEditIndex(false)}>Cancel</Button>
        <Button onClick={() => handleUpload()}>SAVE</Button>
      </DialogActions> */}
    </Dialog>
  );
};

const styles = makeStyles((theme) => ({
  textInput: {
    color: "#BDBDBD",
    marginTop: "1rem",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

export default ProfilePageCarauselEditForm;
