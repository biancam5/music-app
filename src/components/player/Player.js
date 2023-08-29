import React, { useState, useRef, useEffect } from "react";
import "./Player.css";

export const Player = ({ currentSong, onNextSong, onPreviousSong }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (isPlaying && !isAudioPlaying) {
      audioRef.current.play();
      setIsAudioPlaying(true);
    } else if (!isPlaying && isAudioPlaying) {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    }
  }, [isPlaying, isAudioPlaying]);

  const playPauseHandler = () => {
    setIsPlaying(!isPlaying);
  };

  const handleAudioEnded = () => {
    setIsAudioPlaying(false);
    onNextSong();
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current.load();
    setIsAudioPlaying(false);
    if (isPlaying) {
      setIsPlaying(false);
    }
  }, [currentSong]);

  return (
    <div className="player-container">
      <img
        className="song-cover"
        src={currentSong.cover}
        alt={currentSong.name}
      />
      <h2 className="song-name">{currentSong.name}</h2>
      <h3 className="song-artist">{currentSong.artist}</h3>
      <div className="playing-bar">
        <span>0:00</span>
        <span className="end-time">3:30</span>
      </div>

      <audio
        ref={audioRef}
        src={currentSong.audio}
        onPause={() => setIsAudioPlaying(false)}
        onEnded={handleAudioEnded}
      ></audio>

      <div className="controls">
        <div className="like-button" onClick={toggleLike}>
          <i className={`bi bi-heart${isLiked ? "-fill" : ""} like-icon`}></i>
        </div>
        <button className="play-pause-button" onClick={onPreviousSong}>
          <i className="bi bi-skip-start-fill"></i>
        </button>
        <button className="play-pause-button" onClick={playPauseHandler}>
          {isAudioPlaying ? (
            <i className="bi bi-pause-btn-fill"></i>
          ) : (
            <i className="bi bi-play-fill"></i>
          )}
        </button>
        <button className="play-pause-button" onClick={onNextSong}>
          <i className="bi bi-skip-end-fill"></i>
        </button>
      </div>
    </div>
  );
};
