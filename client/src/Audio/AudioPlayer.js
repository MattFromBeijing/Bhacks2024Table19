import React, { useState, useRef, useEffect } from "react";
import "./AudioPlayer.css";
import playIcon from "../Audio/AudioSpeakerPlay.png";
import pauseIcon from "../Audio/AudioSpeakerPause.png";

const audioFiles = [
  "audio/CafeAustriaAudio.mp3",
  "audio/CafeBoliviaAudio.mp3",
  "audio/CafeEnglandAudio.mp3",
  "audio/CafeFranceAudio.mp3",
  "audio/CafeGreeceAudio.mp3",
  "audio/CafeItalyAudio.mp3",
  "audio/CafeSlovakiaAudio.mp3",
  "audio/CafeSpainAudio.mp3",
];

const audioTitles = [
  "Somewhere in in/ Austria",
  "Somewhere in in/ Bolivia",
  "Somewhere in in/ England",
  "Somewhere in in/ France",
  "Somewhere in in/ Greece",
  "Somewhere in in/ Italy",
  "Somewhere in in/ Slovakia",
  "Somewhere in in/ Spain",
];

const AudioPlayer = () => {
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    audioRef.current.src = require(`./${audioFiles[currentAudioIndex]}`);
    audioRef.current.volume = volume;
    audioRef.current.load();
    setIsPlaying(false);

    return () => {
      audioRef.current.pause();
      audioRef.current.src = "";
    };
  }, [currentAudioIndex]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const playPauseAudio = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const changeAudio = (index) => {
    setCurrentAudioIndex(index);
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
  };

  return (
    <div className="audio-controls">
      <h3 style={{ textAlign: "center" }}>
        <div>{audioTitles[currentAudioIndex].split(" in/ ")[0]}</div>
        <div>{audioTitles[currentAudioIndex].split(" in/ ")[1]}</div>
      </h3>
      <div className="controls">
        <button
          onClick={() =>
            changeAudio(
              (currentAudioIndex - 1 + audioFiles.length) % audioFiles.length
            )
          }
        >
          &#9664;&#9664; {/* Left arrow */}
        </button>
        <button onClick={playPauseAudio}>
          <img
            src={isPlaying ? playIcon : pauseIcon}
            alt="Play/Pause"
            style={{ width: "24px", height: "24px" }}
          />
        </button>
        <button
          onClick={() =>
            changeAudio((currentAudioIndex + 1) % audioFiles.length)
          }
        >
          &#9654;&#9654; {/* Right arrow */}
        </button>
      </div>
      <div className="volume-control">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
      <audio ref={audioRef} loop />
    </div>
  );
};

export default AudioPlayer;
