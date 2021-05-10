import React from "react";

/* eslint-disable-next-line react/prop-types */
function Logo({ height, width, dark }) {
  return (
    <img
      style={{ height, width }}
      src={dark ? "../assets/logoBlack.png" : "../assets/logo.png"}
    />
  );
}

export default Logo;
