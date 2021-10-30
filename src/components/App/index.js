import React, { useState, useReducer } from "react";
import MovieSearch from "../MovieSearch";
import Playlist from "../Playlist";
import useDebounce from "../../hooks/useDebounce";
import "./styles.css";

const App = () => {
  const [isConfirmation, setIsConfirmation] = useReducer((d) => !d, false);
  const [movieSearchTerm, setMovieSearchTerm] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const debouncedSearchTerm = useDebounce(movieSearchTerm, 300);

  const handleAddMovie = (movie) => setPlaylist([...playlist, movie]);
  const handleRemoveMovie = (movie) => {
    const newPlaylist = playlist.filter((m) => m.imdbID !== movie.imdbID);
    setPlaylist(newPlaylist);
    if (newPlaylist.length === 0) {
      setIsConfirmation(false);
    }
  };

  return (
    <div className="app-container">
      <div className="content-container">
        <header>
          <span className="logo">🍿</span>
          <button
            onClick={setIsConfirmation}
            className="btn-nav"
            disabled={!isConfirmation && playlist.length < 1}
          >
            {isConfirmation
              ? "Add More"
              : `Confirm${playlist.length > 0 ? ` (${playlist.length})` : ""}`}
          </button>
        </header>
        {!isConfirmation ? (
          <>
            <input
              type="text"
              value={movieSearchTerm}
              onChange={(e) => setMovieSearchTerm(e.target.value)}
              placeholder="Search for a movie..."
            />
            <MovieSearch
              movieSearchTerm={debouncedSearchTerm}
              playlist={playlist}
              handleAddMovie={handleAddMovie}
            />
          </>
        ) : (
          <Playlist playlist={playlist} handleRemoveMovie={handleRemoveMovie} />
        )}
      </div>
      <footer>
        <span>
          {isConfirmation
            ? "My favorite color is #000000!"
            : "Made with 🌮 in San Diego, CA"}
        </span>
      </footer>
    </div>
  );
};

export default App;
