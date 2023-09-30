import React from "react";
import bibiVideo from "./bibi.mp4";
import * as classes from "./style.module.css";

export default function AnimationSection() {
  return (
    <div className={classes.box}>
      <video
        autoPlay
        playsInline
        loop
        muted
        src={bibiVideo}
        className={classes.videoBox}
        type="video/mp4"
      ></video>
    </div>
  );
}
