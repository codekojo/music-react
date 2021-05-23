import React, { useEffect, useState, useRef } from "react";
import "./style/style.scss";
import Player from "./component/Player";
import Song from "./component/Song";
import Nav from "./component/Nav";
import axios from "axios";
import { Library } from "./component/Library";

const API = "N2MxM2I1YTYtYTNiZC00MTJmLThlYzYtOThkNDhjNDk4ZDM0";

const URI =
  "https://api.napster.com/v2.1/tracks/top?apikey=N2MxM2I1YTYtYTNiZC00MTJmLThlYzYtOThkNDhjNDk4ZDM0";

const App = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const audioRef = useRef(null);

  async function getTrack() {
    try {
      const response = await axios.get(URI);
      const { tracks } = response.data;
      console.log(tracks);
      const data = tracks.map(track => {
        return {
          id: track.id,
          name: track.name,
          cover: track.albumId,
          album: track.albumName,
          artist: track.artistName,
          audio: track.previewURL,
          active: false,
          color1: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          color2: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        };
      });
      setSongs([data]);
      setCurrentSong(data[0]);
    } catch (err) {
      console.error(err);
    }
  }

  function settingCurrentSong(selctedCurrentIdSong) {
    const selectCurrentSong = songs.map(song => {
      return song.filter(song => {
        return song.id === selctedCurrentIdSong;
      });
    });

    setCurrentSong(selectCurrentSong[0][0]);
  }

  function handleAudioPlay() {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  }

  function handleTimeUpdate(e) {
    const { currentTime, duration } = e.target;
    //Calc percentage
    const roundedCurrent = Math.round(currentTime);
    const roundedDuration = Math.round(duration);
    const animationPercentage = Math.round(
      (roundedCurrent / roundedDuration) * 100
    );

    setSongInfo({ ...songInfo, currentTime, duration, animationPercentage });
  }

  function handleDrag(e) {
    const { value } = e.target;
    audioRef.current.currentTime = value;
    setSongInfo({ ...songInfo, currentTime: value });
  }

  async function setSongToTrue() {
    setIsPlaying(true);
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        audioRef.current.play();
      });
    }
  }

  async function handleSkipTrack(direction) {
    let songIndex = songs.map(song => {
      return song.findIndex(song => {
        return song.id === currentSong.id;
      });
    });

    if (direction === "skip-forward") {
      if (++songIndex < songs[0].length) {
        await setCurrentSong(songs[0][songIndex]);
        setSongToTrue();
      } else {
        await setCurrentSong(songs[0][0]);
        setSongToTrue();
      }
    } else if (direction === "skip-back") {
      songIndex -= 1;
      if (songIndex === -1) {
        songIndex = songs[0].length - 1;
        await setCurrentSong(songs[0][songIndex]);
        setSongToTrue();
      } else {
        await setCurrentSong(songs[0][songIndex]);
        setSongToTrue();
      }
    }
  }

  async function songEndHadler() {
    await handleSkipTrack("skip-forward");
  }

  useEffect(() => {
    getTrack();
  }, []);

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentsong={currentSong} />
      <Player
        handleDrag={handleDrag}
        songInfo={songInfo}
        audioRef={audioRef}
        handleAudioPlay={handleAudioPlay}
        handleTimeUpdate={handleTimeUpdate}
        currentPlayer={currentSong}
        isPlaying={isPlaying}
        setPlaying={setIsPlaying}
        handleSkipTrack={handleSkipTrack}
      />
      <Library
        songs={songs}
        setSongToTrue={setSongToTrue}
        setSong={settingCurrentSong}
        libraryStatus={libraryStatus}
      />
      <audio
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHadler}
      ></audio>
    </div>
  );
};

export default App;
