import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  Tab,
  Tabs,
  useTheme,
} from "@material-ui/core";
import React from "react";

import SwipeableViews from "react-swipeable-views";

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
  handleEdit,
  setEditIndex,
  carauselAssets,
  setCarauselAssets,
}) => {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const handleChange = (event, newValue) => {
    setValue(newValue);
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
            <Tab label={values.youtube + " " + index} {...a11yProps(0)} />
            <Tab label={"OR"} {...a11yProps(0)} disabled={true} />
            <Tab label={values.image + " " + index} {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            Item One
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}></TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <ImageSelectAndCrop
              title="Select image to upload"
              imagePath={carauselAssets[index].link || ""}
              handleDataUrl={null}
            />
          </TabPanel>
        </SwipeableViews>
      </div>
      <DialogActions>
        <Button onClick={() => setEditIndex(false)}>Cancel</Button>
        <Button onClick={() => setEditIndex(false)}>SAVE</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfilePageCarauselEditForm;
