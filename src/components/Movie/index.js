import React, { useReducer } from "react";
import MovieDetails from "../MovieDetails";
import "./styles.css";

const Movie = ({
  movie,
  playlist,
  handleAddMovie,
  handleRemoveMovie,
  isConfirmation,
}) => {
  const [showDetails, toggleShowDetails] = useReducer((d) => !d, false);

  return (
    <div className="movie-container">
      <div className="movie-header">
        <div className="movie-header-details">
          <div className="movie-title">{movie.Title}</div>
          <button className="btn-nav btn-small" onClick={toggleShowDetails}>
            {showDetails ? "Hide" : "Details"}
          </button>
        </div>
        <div className="movie-year">{movie.Year}</div>
      </div>
      {showDetails ? (
        <MovieDetails
          movieId={movie.imdbID}
          movieTitle={movie.Title}
          posterUrl={movie.Poster}
        />
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
