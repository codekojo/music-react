import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  isPlaying,
  songInfo,
  handleAudioPlay,
  handleDrag,
  handleSkipTrack,
  currentPlayer: { color1, color2 },
}) => {
  function handlePlay() {
    handleAudioPlay();
  }

  function getTime(time) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }

  function handleDragg(e) {
    handleDrag(e);
  }

  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  const animate = {
    background: `linear-gradient( to right, ${color1}, ${color2})`,
  };

  return (
    <section className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div style={animate} className="track">
          <input
            min="0"
            max={songInfo.duration}
            value={songInfo.currentTime}
            type="range"
            onChange={handleDragg}
          />
          <div className="animate-track" style={trackAnim}></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>

      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => {
            handleSkipTrack("skip-back");
          }}
          className="skip-back"
          icon={faAngleLeft}
          size="2x"
        />
        <FontAwesomeIcon
          onClick={handlePlay}
          className="play"
          icon={isPlaying ? faPause : faPlay}
          size="2x"
        />
        <FontAwesomeIcon
          onClick={() => {
            handleSkipTrack("skip-forward");
          }}
          className="skip-forward"
          icon={faAngleRight}
          size="2x"
        />
      </div>
    </section>
  );
};

export default Player;
