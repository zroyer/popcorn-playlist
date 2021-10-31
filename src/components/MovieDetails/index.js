import React from "react";
import { useQuery } from "react-query";
import "./styles.css";

const MovieDetails = ({ movieId, movieTitle, posterUrl }) => {
  const moviesQuery = useQuery(
    ["movies", movieId],
    async () => {
      const result = await fetch(
        `http://www.omdbapi.com/?apikey=42ffbe2e&plot=full&i=${movieId}`,
        { method: "GET" }
      );
      return result.json();
    },
    {
      enabled: !!movieId,
    }
  );

  const { data: movie, isLoading, error } = moviesQuery;

  if (error) {
    return null;
  }

  return (
    <div className="movie-details">
      <img src={posterUrl} alt={movieTitle} className="movie-poster" />
      <div className="movie-plot">
        <div className="movie-actors">{movie?.Actors}</div>
        {isLoading ? "Loading..." : `${movie?.Plot} (${movie?.Rated})`}
      </div>
    </div>
  );
};

export default MovieDetails;
