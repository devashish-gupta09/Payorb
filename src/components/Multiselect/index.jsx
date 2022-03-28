import { makeStyles, TextField } from "@material-ui/core";
import { KeyboardArrowDown } from "@material-ui/icons";
import React from "react";
const Multiselect = ({ selected, events, setSelected, label }) => {
  const [show, setShow] = React.useState(false);
  const classes = styles();
  return (
    <div
      style={{ display: "block" }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setShow(false);
        }
      }}
      tabIndex="1"
    >
      <TextField
        className={classes.textInput}
        label={label}
        variant="outlined"
        onChange={null}
        value={null}
        error={null}
        style={{ margin: "0.1em 0.1em" }}
        onClick={() => setShow(true)}
        InputProps={{
          style: {
            width: "7em",
            background: "white",
          },
          endAdornment: (
            <KeyboardArrowDown
              position="end"
              style={{ color: "rgba(189, 189, 189, 1" }}
            ></KeyboardArrowDown>
          ),
        }}
      />
      {show ? (
        <div
          style={{
            position: "absolute",
            width: "7em",
            height: "2.5em",
            zIndex: "50",
            backgroundColor: "#ffffff",
            boxShadow: "0px 0px 4px 1px grey",
            padding: "1em 0em 1em 0em",
            borderRadius: "0.4em",
          }}
          className="multiselect"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "0em 0.2em 0em 0.2em",
            }}
          >
            <small
              style={{
                textAlign: "right",
                fontWeight: "bold",
                cursor: "pointer",
                marginBottom: "0.3em",
              }}
              onClick={() => setShow(false)}
            >
              Close
            </small>
          </div>
          <div style={{ overflowY: "auto", height: "80%" }}>
            {events && events.length
              ? // eslint-disable-next-line react/jsx-key
                events.map((d) => (
                  // eslint-disable-next-line react/jsx-key
                  <div
                    key={d.link}
                    style={{
                      borderBottom: "0.5px dotted rgb(128, 128, 128)",
                      wordBreak: "break-all",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "flex-start",
                      padding: "0em 0.2em 0em 0.2em",
                      fontWeight: selected.includes(d.link) ? "600" : "normal",
                      backgroundColor: selected.includes(d.link)
                        ? "rgba(189,245,242, 0.4)"
                        : "white",
                    }}
                    onClick={() => setSelected(d.link)}
                  >
                    <p style={{ margin: "0.2em 0px" }}>
                      {/* {d.name.length < 10 || d.name.includes(" ")
                      ? d.name
                      : d.name.slice(0, 10) + "  ..."} */}
                      {d.name}
                    </p>
                  </div>
                ))
              : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Multiselect;

const styles = makeStyles((theme) => ({
  textInput: {
    margin: "0.75em 0",
    color: "#BDBDBD",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "0.75em",
      width: "100%",
    },
  },
}));
