import React, { useState, useReducer } from "react";
import { useQuery } from "react-query";
import "./App.css";

const API_KEY = "42ffbe2e";

const MovieSearch = ({ movieSearchTerm, playlist, handleAddMovie }) => {
  const queryInfo = useQuery(
    ["movie", movieSearchTerm],
    async () => {
      const result = await fetch(
        `http://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&type=movie&s=${movieSearchTerm}`,
        { method: "GET" }
      );
      console.log(result);
      return result.json();
    },
    {
      enabled: !!movieSearchTerm,
    }
  );

  return queryInfo?.data?.Search?.length > 0 ? (
    <div className="playlist-container">
      {queryInfo.data.Search.map((movie) => (
        <Movie
          movie={movie}
          playlist={playlist}
          handleAddMovie={handleAddMovie}
          key={movie.imdbID}
        />
      ))}
    </div>
  ) : (
    <div className="message-container">
      {queryInfo.isLoading
        ? "Loading..."
        : queryInfo.isError
        ? queryInfo.error.message
        : movieSearchTerm.length > 0
        ? "Movie not found."
        : null}
    </div>
  );
};

const Playlist = ({ playlist, handleRemoveMovie }) => {
  return (
    <div className="playlist-container">
      {playlist.map((movie) => (
        <Movie
          movie={movie}
          playlist={playlist}
          key={movie.imdbID}
          handleRemoveMovie={handleRemoveMovie}
          isConfirmation
        />
      ))}
    </div>
  );
};

const Movie = ({
  movie,
  playlist,
  handleAddMovie,
  handleRemoveMovie,
  isConfirmation,
}) => (
  <div className="movie-container">
    <div className="movie-details">
      <div className="movie-title">{movie.Title}</div>
      <div className="movie-year">{movie.Year}</div>
    </div>
    <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
    {isConfirmation ? (
      <button onClick={() => handleRemoveMovie(movie)} className="btn-cta">
        Remove
      </button>
    ) : (
      <button
        className="btn-cta"
        onClick={() => handleAddMovie(movie)}
        disabled={playlist.includes(movie)}
      >
        {!playlist.includes(movie) ? "Add" : "Added!"}
      </button>
    )}
  </div>
);

const App = () => {
  const [isConfirmation, setIsConfirmation] = useReducer((d) => !d, false);
  const [movieSearchTerm, setMovieSearchTerm] = useState("");
  const [playlist, setPlaylist] = useState([]);

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
            {isConfirmation ? "Add More" : "Confirm"}
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
              movieSearchTerm={movieSearchTerm}
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
