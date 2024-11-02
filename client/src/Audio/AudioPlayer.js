import React, { useState, useRef, useEffect } from "react";
import "./AudioPlayer.css";

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
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current.volume = volume; // Set initial volume
    audioRef.current.src = require(`./${audioFiles[currentAudioIndex]}`);
    audioRef.current.load(); // Load the new audio source
  }, [currentAudioIndex, volume]);

  const playPauseAudio = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  const changeAudio = (index) => {
    setCurrentAudioIndex(index);
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  return (
    <div className="audio-controls">
      <h3>
        {audioFiles[currentAudioIndex]
          .replace(/Audio\.mp3$/, "")
          .replace(/Cafe/, "Cafe ")}
      </h3>
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
      <div className="volume-control">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
        <span>{Math.round(volume * 100)}%</span>
      </div>
      <audio ref={audioRef} loop />
    </div>
  );
};

export default AudioPlayer;
