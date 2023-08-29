import React, { useState } from "react";
import "./App.css";
import chillHop from "./chillHop";
import { SongList } from "./components/songs/SongList";
import { Player } from "./components/player/Player";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [songs, setSongs] = useState(chillHop);
  const [currentSong, setCurrentSong] = useState(songs[0]);

  const selectSongHandler = (song) => {
    setCurrentSong(song);
  };

  const getNextSong = (currentSong) => {
    const currentSongIndex = songs.findIndex(
      (song) => song.id === currentSong.id
    );
    const nextSongIndex = (currentSongIndex + 1) % songs.length;
    return songs[nextSongIndex];
  };

  const getPreviousSong = (currentSong) => {
    const currentSongIndex = songs.findIndex(
      (song) => song.id === currentSong.id
    );
    const previousSongIndex =
      (currentSongIndex - 1 + songs.length) % songs.length;
    return songs[previousSongIndex];
  };

  const playNextSong = () => {
    const nextSong = getNextSong(currentSong);
    setCurrentSong(nextSong);
  };

  const playPreviousSong = () => {
    const previousSong = getPreviousSong(currentSong);
    setCurrentSong(previousSong);
  };

  return (
    <div className="App">
      <header>
        <h1>Appendix A - Music App example</h1>
      </header>
      <main>
        <Player
          currentSong={currentSong}
          onNextSong={playNextSong}
          onPreviousSong={playPreviousSong}
        />
        <SongList songs={songs} onSelectSong={selectSongHandler} />
      </main>
    </div>
  );
}

export default App;
