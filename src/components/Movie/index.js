import React, { useReducer } from "react";
import "./styles.css";

const Movie = ({
  movie,
  playlist,
  handleAddMovie,
  handleRemoveMovie,
  isConfirmation,
}) => {
  const [showPoster, toggleShowPoster] = useReducer((d) => !d, false);
  return (
    <div className="movie-container">
      <div className="movie-header">
        <div className="movie-header-details">
          <div className="movie-title">{movie.Title}</div>
          <div className="movie-year">{movie.Year}</div>
        </div>
        <button className="btn-nav btn-small" onClick={toggleShowPoster}>
          {`${showPoster ? "Hide" : "Show"}`} Poster
        </button>
      </div>
      {showPoster ? (
        <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
      ) : null}
      {isConfirmation ? (
        <button
          onClick={() => handleRemoveMovie(movie)}
          className="btn-cta remove"
        >
          Remove
        </button>
      ) : (
        <button
          className="btn-cta add"
          onClick={() => handleAddMovie(movie)}
          disabled={playlist.includes(movie)}
        >
          {!playlist.includes(movie) ? "Add" : "Added"}
        </button>
      )}
    </div>
  );
};

export default Movie;
