import React from "react";
import "./SongList.css";

export const SongList = ({ songs, onSelectSong }) => {
  return (
    <div className="song-list-container">
      <h2>Library</h2>
      {songs.map((song) => (
        <div
          className="song-item"
          key={song.id}
          onClick={() => onSelectSong(song)}
        >
          <img className="song-cover-list" src={song.cover} alt={song.name} />
          <div className="song-info-list">
            <h3 className="song-name-list">{song.name}</h3>
            <p className="song-artist-list">{song.arUst}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
