import {
  FormHelperText,
  FormLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React from "react";

import { EVENT_CATEGORY } from "../../constants/events";

export const EventCategoryField = ({ formik, checkDisabled }) => {
  const [other, setOther] = React.useState(false);
  const [otherField, setOtherField] = React.useState(false);

  const handleEventCategoryChange = (event) => {
    console.log("VALUE : ", event.target.value);
    if (event.target.value === "OTHER") {
      setOther(true);
      formik.setFieldValue("category", "OTHER");
      return;
    } else if (other) {
      setOther(false);
    }
    formik.setFieldValue("category", event.target.value);
  };

  const handleOthersChange = (event) => {
    setOtherField(event.target.value);
    formik.setFieldValue("otherField", event.target.value);
  };

  return (
    <>
      <FormLabel>Event Type</FormLabel>

      <Select
        displayEmpty
        variant="outlined"
        id="type"
        value={formik.values.category}
        onChange={handleEventCategoryChange}
        style={{ width: "100%", margin: "0.5em 0" }}
        error={formik.touched.category && Boolean(formik.errors.typecategory)}
        disabled={checkDisabled()}
      >
        <MenuItem value={""}>
          <em>None</em>
        </MenuItem>
        {Object.keys(EVENT_CATEGORY).map((eventCategory) => {
          return (
            <MenuItem key={eventCategory} value={eventCategory}>
              <em>{EVENT_CATEGORY[eventCategory]}</em>
            </MenuItem>
          );
        })}
        {!Object.keys(EVENT_CATEGORY).includes(formik.values.category) ? (
          <MenuItem key={formik.values.category} value={formik.values.category}>
            <em>{formik.values.category}</em>
          </MenuItem>
        ) : null}
      </Select>
      {other ? (
        <TextField
          id="category"
          value={formik.values.otherField}
          onChange={handleOthersChange}
          variant={"outlined"}
          fullWidth
        ></TextField>
      ) : null}
      <FormHelperText
        error={formik.touched.type && Boolean(formik.errors.type)}
      >
        {formik.touched.type && formik.errors.type}
      </FormHelperText>
    </>
  );
};

export default EventCategoryField;