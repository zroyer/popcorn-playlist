import React from "react";
import { useQuery } from "react-query";
import Movie from "../Movie";
import "./styles.css";

const MovieSearch = ({ movieSearchTerm, playlist, handleAddMovie }) => {
  const moviesQuery = useQuery(
    ["movies", movieSearchTerm],
    async () => {
      const result = await fetch(
        `http://www.omdbapi.com/?&apikey=42ffbe2e&type=movie&plot=short&s=${movieSearchTerm}`,
        { method: "GET" }
      );
      return result.json();
    },
    {
      enabled: !!movieSearchTerm,
    }
  );

  return moviesQuery?.data?.Search?.length > 0 ? (
    <div className="playlist-container">
      {moviesQuery.data.Search.map((movie) => (
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
      {moviesQuery.isLoading
        ? "Loading..."
        : moviesQuery.isError
        ? moviesQuery.error.message
        : movieSearchTerm.length > 0
        ? "Movie not found."
        : null}
    </div>
  );
};

export default MovieSearch;
