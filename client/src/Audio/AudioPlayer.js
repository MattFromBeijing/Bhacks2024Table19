// src/AudioPlayer.js
import React, { useState, useRef } from "react";
import "./AudioPlayer.css"; // Create a separate CSS file for styling

const audioFiles = [
  "CafeAustriaAudio.mp3",
  "CafeBoliviaAudio.mp3",
  "CafeEnglandAudio.mp3",
  "CafeFranceAudio.mp3",
  "CafeGreeceAudio.mp3",
  "CafeItalyAudio.mp3",
  "CafeSlovakiaAudio.mp3",
  "CafeSpainAudio.mp3",
];

const AudioPlayer = () => {
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const audioRef = useRef(null);

  const playPauseAudio = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  const changeAudio = (index) => {
    setCurrentAudioIndex(index);
    audioRef.current.src = require(`./${audioFiles[index]}`);
    audioRef.current.play();
  };

  const handleVolumeChange = (event) => {
    audioRef.current.volume = event.target.value;
  };

  return (
    <div className="audio-controls">
      <button
        onClick={() =>
          changeAudio(
            (currentAudioIndex - 1 + audioFiles.length) % audioFiles.length
          )
        }
      >
        Prev
      </button>
      <button onClick={playPauseAudio}>
        {audioRef.current?.paused ? "Play" : "Pause"}
      </button>
      <button
        onClick={() => changeAudio((currentAudioIndex + 1) % audioFiles.length)}
      >
        Next
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        defaultValue="0.5"
        onChange={handleVolumeChange}
      />
      <audio ref={audioRef} loop>
        <source
          src={require(`./${audioFiles[currentAudioIndex]}`)}
          type="audio/mpeg"
        />
        Your browser does not support the audio tag.
      </audio>
    </div>
  );
};

export default AudioPlayer;
