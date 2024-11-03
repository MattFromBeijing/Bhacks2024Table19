import React, { useState, useRef, useEffect } from "react";
import "./AudioPlayer.css";
import playIcon from "../Audio/AudioSpeakerPlay.png"; // Adjust with correct path if necessary
import pauseIcon from "../Audio/AudioSpeakerPause.png"; // Adjust with correct path if necessary

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

// Array of titles corresponding to each audio file
const audioTitles = [
  "Cafe Austria",
  "Cafe Bolivia",
  "Cafe England",
  "Cafe France",
  "Cafe Greece",
  "Cafe Italy",
  "Cafe Slovakia",
  "Cafe Spain",
];

const AudioPlayer = () => {
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    audioRef.current.src = require(`./${audioFiles[currentAudioIndex]}`);
    audioRef.current.volume = volume; // Set volume when audio index changes
    audioRef.current.load();
    setIsPlaying(false); // Ensure it's paused when switching tracks

    // Cleanup on unmount
    return () => {
      audioRef.current.pause();
      audioRef.current.src = ""; // Reset the source
    };
  }, [currentAudioIndex]);

  useEffect(() => {
    audioRef.current.volume = volume; // Update volume without restarting
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
    audioRef.current.pause(); // Pause the audio
    setIsPlaying(false); // Set the icon to paused
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume); // Update volume state
  };

  return (
    <div className="audio-controls">
      <h3>
        {audioTitles[currentAudioIndex]}{" "}
        {/* Display title instead of filename */}
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
