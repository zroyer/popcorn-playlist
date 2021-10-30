import { useQuery } from "react-query";
import React from "react";
import Movie from "../Movie";

const API_KEY = "42ffbe2e";

const MovieSearch = ({ movieSearchTerm, playlist, handleAddMovie }) => {
  const queryInfo = useQuery(
    ["movie", movieSearchTerm],
    async () => {
      const result = await fetch(
        `http://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&type=movie&plot=short&s=${movieSearchTerm}`,
        { method: "GET" }
      );
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

export default MovieSearch;
