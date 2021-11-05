import React from "react";
import ReactPlayer from "react-player";
const VideoPlayer = ({ link }) => (
  <ReactPlayer url={link} width="100%" height="100%" />
);

export default VideoPlayer;
